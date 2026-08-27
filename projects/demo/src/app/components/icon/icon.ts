import { Component, DestroyRef, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { IconComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-icon',
  imports: [CodeBlock, DocPager, IconComponent],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private faLink: HTMLLinkElement | null = null;
  private copyTimeout: ReturnType<typeof setTimeout> | undefined;

  protected readonly copiedIcon = signal<string | null>(null);

  /**
   * Loads Font Awesome for the custom icon demo - page-only CDN.
   *
   * @returns void
   */
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.document.getElementById('fa-cdn-for-icon-demo')) {
      return;
    }

    const link = this.document.createElement('link');
    link.id = 'fa-cdn-for-icon-demo';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    this.document.head.appendChild(link);
    this.faLink = link;

    this.destroyRef.onDestroy(() => {
      if (this.faLink?.parentNode) {
        this.faLink.parentNode.removeChild(this.faLink);
      }
    });
  }

  /**
   * Copies an icon name to the clipboard and shows feedback.
   *
   * @param name The icon name to copy.
   *
   * @returns void
   */
  protected copyIconName(name: string): void {
    void this.writeToClipboard(name);

    this.copiedIcon.set(name);
    clearTimeout(this.copyTimeout);
    this.copyTimeout = setTimeout(() => {
      if (this.copiedIcon() === name) {
        this.copiedIcon.set(null);
      }
    }, 1500);
  }

  /**
   * Writes text to the clipboard with fallback for insecure contexts.
   *
   * @param text The text to copy.
   *
   * @returns void
   */
  private async writeToClipboard(text: string): Promise<void> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch {
      // fall through to execCommand fallback
    }

    const area = this.document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    this.document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  /**
   * Snippet for importing `IconComponent`.
   */
  protected readonly importSnippet = `import { IconComponent } from '@im4all/roolith-ng';

@Component({
  imports: [IconComponent]
})`;

  /**
   * Basic usage markup.
   */
  protected readonly basicSnippet = `<rng-icon name="calendar" />`;

  /**
   * Sized icon markup - small, default and large.
   */
  protected readonly sizedSnippet = `<rng-icon name="settings" size="small" />
<rng-icon name="settings" />
<rng-icon name="settings" size="large" />`;

  /**
   * Fixed pixel width markup.
   */
  protected readonly widthSnippet = `<rng-icon name="home" [width]="24" />`;

  /**
   * With additional CSS class markup.
   */
  protected readonly styleClassSnippet = `<rng-icon name="alert" styleClass="my-custom-class" />`;

  /**
   * CDN link for Font Awesome - page-only demo.
   */
  protected readonly cdnSnippet = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />`;

  /**
   * Custom and third-party icon markup.
   */
  protected readonly customSnippet = `<!-- Your own SVG icon: provide .rng-icon--example in your own SCSS -->
<rng-icon name="example" [custom]="true" />

<!-- Third-party icon font: pass the full space-separated class list -->
<rng-icon name="fa-solid fa-user" [custom]="true" />

<!-- Iconoir is already loaded globally via index.html -->
<rng-icon name="iconoir-home" [custom]="true" />`;

  /**
   * Custom SCSS for your own SVG icon.
   */
  protected readonly customScssSnippet = `/* Your own SCSS */
.rng-icon--example {
  mask-image: inline-svg('<svg ...>...</svg>');
  -webkit-mask-image: inline-svg('<svg ...>...</svg>');
}`;

  /**
   * Full example combining size, width and custom styling.
   */
  protected readonly fullSnippet = `import { IconComponent } from '@im4all/roolith-ng';

@Component({
  imports: [IconComponent]
})
export class ExampleComponent {}`;

  /**
   * Full template markup.
   */
  protected readonly fullTemplateSnippet = `<rng-icon name="calendar" />
<rng-icon name="settings" size="large" />
<rng-icon name="home" [width]="32" />
<rng-icon name="alert" styleClass="my-custom-class" />
<rng-icon name="fa-solid fa-user" [custom]="true" />
<rng-icon name="iconoir-home" [custom]="true" />`;

  /**
   * List of built-in icon names from `IconNameType`.
   */
  protected readonly availableIcons: string[] = [
    'home',
    'bar-chart',
    'clipboard',
    'clock',
    'file-text',
    'sliders',
    'file',
    'settings',
    'task-list',
    'calendar',
    'dot-circle',
    'plus',
    'location',
    'users',
    'users-settings',
    'arrow-union',
    'chevron-down',
    'left-circle-solid',
    'help',
    'left',
    'right',
    'more',
    'select',
    'check',
    'sort',
    'sort-up',
    'sort-down',
    'search',
    'arrow-left',
    'arrow-right',
    'delete',
    'sidebar',
    'logout',
    'toggle-mode',
    'minus',
    'info',
    'alert',
    'spinner',
    'check-solid',
    'xmark-solid',
    'bookmark-circle-solid',
    'minus-circle-solid',
    'redo-circle-solid',
    'filter',
    'filter-solid',
    'filter-list',
    'user',
    'plus-square',
    'minus-square',
    'edit',
    'download',
    'more-vertical',
    'file-csv',
    'file-code',
  ];
}
