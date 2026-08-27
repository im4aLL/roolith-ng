import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HighlightService } from '../highlight/highlight.service';

@Component({
  selector: 'rng-code-block',
  imports: [],
  templateUrl: './code-block.html',
  styleUrl: './code-block.scss',
})
export class CodeBlock {
  /**
   * Raw source code to highlight.
   */
  readonly code = input.required<string>();

  /**
   * Shiki language identifier.
   */
  readonly language = input<string>('typescript');

  /**
   * Optional title shown in the window bar.
   */
  readonly title = input<string>('');

  /**
   * Visual variant:
   * - `window` renders the chrome with dots and title bar (home hero style)
   * - `block` renders bordered block with header (install section style)
   * - `prose` renders minimal pre style for documentation pages
   */
  readonly variant = input<'window' | 'block' | 'prose'>('prose');

  /**
   * Whether to show the copy button.
   */
  readonly showCopy = input<boolean>(true);

  /**
   * Optional hint text displayed below the code (used for window variant).
   */
  readonly hint = input<string>('');

  /**
   * Emits when code is successfully copied.
   */
  readonly copiedChange = output<void>();

  private readonly highlightService = inject(HighlightService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly copied = signal(false);
  private copyTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly highlightedHtml = signal<string>('');

  protected readonly safeHtml = computed<SafeHtml>(() => {
    const html = this.highlightedHtml();
    if (!html) {
      const escaped = this.escapeHtml(this.code());
      return this.sanitizer.bypassSecurityTrustHtml(`<pre class="shiki"><code>${escaped}</code></pre>`);
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  constructor() {
    effect(() => {
      const code = this.code();
      const language = this.language();

      this.highlightedHtml.set('');
      void this.render(code, language);
    });
  }

  /**
   * Copies the current code to clipboard and flashes the copied state.
   *
   * @returns void
   */
  protected async copy(): Promise<void> {
    const text = this.code();
    const isCopied = await this.writeClipboard(text);

    if (isCopied) {
      this.copied.set(true);
      this.copiedChange.emit();
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(false), 1600);
    }
  }

  /**
   * Renders the code via the highlight service.
   *
   * @param code The code to highlight.
   * @param language The language identifier.
   *
   * @returns void
   */
  private async render(code: string, language: string): Promise<void> {
    const html = await this.highlightService.highlight(code, language);
    this.highlightedHtml.set(html);
  }

  /**
   * Writes text to clipboard with fallback for insecure contexts.
   *
   * @param text The text to write.
   *
   * @returns Whether the write succeeded.
   */
  private async writeClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fall through to execCommand fallback
    }

    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const isSuccess = document.execCommand('copy');
    area.remove();
    return isSuccess;
  }

  /**
   * Escapes HTML for the fallback placeholder.
   *
   * @param value The value to escape.
   *
   * @returns The escaped value.
   */
  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
