import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface IOutlineItem {
  id: string;
  text: string;
}

@Component({
  selector: 'rng-doc-page-outline',
  host: { class: 'doc-outline' },
  templateUrl: './page-outline.html',
  styleUrl: './page-outline.scss',
})
export class PageOutline implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly items = signal<IOutlineItem[]>([]);
  protected readonly activeId = signal<string | null>(null);
  protected readonly currentPath = signal<string>('');

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.updateCurrentPath();
    this.collect();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.updateCurrentPath();
          queueMicrotask(() => this.collect());
        },
        error: () => undefined,
      });
  }

  /**
   * Updates the current path used for outline link hrefs.
   *
   * Keeps the href as `components/filter#usage` instead of just `#usage`.
   *
   * @returns void
   */
  private updateCurrentPath(): void {
    const [urlWithoutHash] = this.router.url.split('#');
    const [cleanUrl] = urlWithoutHash.split('?');
    this.currentPath.set(cleanUrl || window.location.pathname);
  }

  /**
   * Builds the href for an outline item including the component path.
   *
   * @param id The heading id.
   *
   * @returns The href string like `/components/filter#usage`.
   */
  protected hrefFor(id: string): string {
    const base = this.currentPath() || window.location.pathname;
    return `${base}#${id}`;
  }

  /**
   * Scrolls the target heading into view and updates the URL hash.
   *
   * @param event The click event, used to prevent default navigation.
   * @param id The heading id to scroll to and set as active.
   * @returns void
   */
  protected onLinkClick(event: MouseEvent, id: string): void {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const url = new URL(window.location.href);
    url.hash = id;
    history.replaceState(null, '', url.toString());
    this.activeId.set(id);
  }

  /**
   * Reads H2 headings from the current page's article and resets the active observer.
   *
   * @returns void
   */
  private collect(): void {
    const article = document.querySelector('article.doc-prose');
    if (!article) {
      this.items.set([]);
      this.activeId.set(null);
      this.disconnectObserver();
      return;
    }

    const headings = article.querySelectorAll<HTMLHeadingElement>('h2');
    const items: IOutlineItem[] = [];
    const seen = new Map<string, number>();

    headings.forEach((heading) => {
      const baseId = this.slugify(heading.textContent ?? '');
      const count = seen.get(baseId) ?? 0;
      seen.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      heading.id = id;
      items.push({ id, text: heading.textContent?.trim() ?? '' });
    });

    this.items.set(items);
    this.observeActive(items.map((item) => item.id));
  }

  /**
   * Watches the given heading ids and marks the topmost visible one as active.
   *
   * @param ids The heading ids to observe.
   * @returns void
   */
  private observeActive(ids: string[]): void {
    this.disconnectObserver();
    if (ids.length === 0) {
      this.activeId.set(null);
      return;
    }

    const elements = this.resolveElements(ids);
    if (elements.length === 0) {
      return;
    }

    this.observer = this.createObserver();
    elements.forEach((element) => this.observer?.observe(element));
    this.destroyRef.onDestroy(() => this.disconnectObserver());
  }

  /**
   * Builds an IntersectionObserver that highlights the topmost visible heading.
   *
   * @returns The configured IntersectionObserver instance.
   */
  private createObserver(): IntersectionObserver {
    return new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        if (visible.length > 0) {
          this.activeId.set(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
  }

  /**
   * Resolves a list of heading ids to their DOM elements, dropping any missing.
   *
   * @param ids The heading ids to resolve.
   * @returns The resolved, non-null heading elements.
   */
  private resolveElements(ids: string[]): HTMLElement[] {
    return ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
  }

  /**
   * Disconnects the active-section observer if one exists.
   *
   * @returns void
   */
  private disconnectObserver(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  /**
   * Converts a heading's text into a stable, URL-safe id slug.
   *
   * @param text The heading text to slugify.
   * @returns The generated slug.
   */
  private slugify(text: string): string {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
