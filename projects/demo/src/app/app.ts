import {
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { Topbar } from './components/topbar/topbar';
import { Sidebar } from './components/sidebar/sidebar';
import { PageOutline } from './components/page-outline/page-outline';

@Component({
  selector: 'rng-root',
  imports: [RouterOutlet, RouterLink, Topbar, Sidebar, PageOutline],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly theme = signal<'light' | 'dark'>(this.initialTheme());
  protected readonly menuOpen = signal(false);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isHome = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url === '/'),
    ),
    { initialValue: this.router.url === '/' },
  );

  constructor() {
    effect(() => {
      const value = this.theme();
      document.documentElement.classList.toggle('theme-dark', value === 'dark');
      localStorage.setItem('doc-theme', value);
    });

    effect(() => {
      document.body.classList.toggle('doc-body--drawer-open', this.menuOpen());
    });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => this.menuOpen.set(false),
        error: () => undefined,
      });

    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('keydown', this.onKeydown);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('keydown', this.onKeydown);
      document.body.classList.remove('doc-body--drawer-open');
    });
  }

  /**
   * Toggles the mobile navigation drawer open or closed.
   *
   * @returns void
   */
  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /**
   * Closes the mobile navigation drawer.
   *
   * @returns void
   */
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /**
   * Closes the drawer once the viewport reaches the desktop sidebar breakpoint.
   *
   * @returns void
   */
  private onResize = (): void => {
    if (window.innerWidth >= 1024 && this.menuOpen()) {
      this.menuOpen.set(false);
    }
  };

  /**
   * Closes the drawer when the Escape key is pressed.
   *
   * @param event The keyboard event to inspect.
   * @returns void
   */
  private onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.menuOpen()) {
      this.menuOpen.set(false);
    }
  };

  /**
   * Resolves the initial theme from storage, falling back to the OS preference.
   *
   * @returns The resolved theme, either `'light'` or `'dark'`.
   */
  private initialTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem('doc-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    const isDarkPreferred =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return isDarkPreferred ? 'dark' : 'light';
  }

  /**
   * Toggles between the light and dark themes.
   *
   * @returns void
   */
  protected toggleTheme(): void {
    this.theme.update((value) => (value === 'dark' ? 'light' : 'dark'));
  }
}
