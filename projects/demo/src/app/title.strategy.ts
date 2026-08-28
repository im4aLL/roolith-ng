import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

/**
 * Custom title strategy that brands route titles with Roolith NG.
 */
@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly brandSuffix = 'Roolith NG';
  private readonly homeTitle = 'Roolith NG - Angular UI Component Library';

  /**
   * Updates the document title based on the current route.
   *
   * @param snapshot The router state snapshot.
   *
   * @returns void
   */
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);

    if (routeTitle !== undefined) {
      if (routeTitle === this.homeTitle) {
        this.title.setTitle(routeTitle);
      } else {
        this.title.setTitle(`${routeTitle} - ${this.brandSuffix}`);
      }
    }
  }
}
