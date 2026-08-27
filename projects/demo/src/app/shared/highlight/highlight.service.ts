import { Injectable } from '@angular/core';
import { createHighlighter, type Highlighter, type BundledLanguage, type BundledTheme } from 'shiki';

type CodeTheme = 'vitesse-light' | 'vitesse-dark';

@Injectable({ providedIn: 'root' })
export class HighlightService {
  private highlighterPromise: Promise<Highlighter> | null = null;
  private readonly lightTheme: CodeTheme = 'vitesse-light';
  private readonly darkTheme: CodeTheme = 'vitesse-dark';

  /**
   * Lazily creates and caches the shiki highlighter.
   *
   * @returns The shared highlighter instance.
   */
  private getHighlighter(): Promise<Highlighter> {
    if (!this.highlighterPromise) {
      this.highlighterPromise = createHighlighter({
        themes: [this.lightTheme, this.darkTheme],
        langs: [
          'typescript',
          'javascript',
          'bash',
          'shell',
          'shellscript',
          'scss',
          'css',
          'html',
          'json',
          'tsx',
          'jsx',
        ],
      });
    }

    return this.highlighterPromise;
  }

  /**
   * Highlights a code string to HTML with dual vitesse themes.
   *
   * The generated HTML contains CSS variables for the dark theme (`--shiki-dark`)
   * and switches via the parent `.theme-dark` class.
   *
   * @param code The source code to highlight.
   * @param language The shiki language identifier (defaults to `typescript`).
   *
   * @returns The highlighted HTML string or a fallback `<pre><code>` if highlighting fails.
   */
  async highlight(code: string, language: string = 'typescript'): Promise<string> {
    const lang = this.normalizeLanguage(language);
    const safeCode = code ?? '';

    try {
      const highlighter = await this.getHighlighter();

      return highlighter.codeToHtml(safeCode, {
        lang: lang as BundledLanguage,
        themes: {
          light: this.lightTheme as BundledTheme,
          dark: this.darkTheme as BundledTheme,
        },
      });
    } catch {
      return `<pre class="shiki vitesse-light"><code>${this.escapeHtml(safeCode)}</code></pre>`;
    }
  }

  /**
   * Normalizes common language aliases to shiki identifiers.
   *
   * @param language The raw language value.
   *
   * @returns The normalized shiki language.
   */
  private normalizeLanguage(language: string): string {
    const value = (language || 'typescript').trim().toLowerCase();
    const aliasMap: Record<string, string> = {
      ts: 'typescript',
      js: 'javascript',
      sh: 'bash',
      shell: 'bash',
      shellscript: 'bash',
    };

    if (aliasMap[value]) {
      return aliasMap[value];
    }

    const supported = new Set(['typescript', 'javascript', 'bash', 'html', 'scss', 'css', 'json']);
    return supported.has(value) ? value : 'typescript';
  }

  /**
   * Escapes HTML special characters for fallback rendering.
   *
   * @param value The raw value to escape.
   *
   * @returns The escaped HTML.
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
