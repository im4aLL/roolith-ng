import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChild,
  input,
  signal,
  viewChild,
  TemplateRef,
  output,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  IPopoverChangeEvent,
  POPOVER_ALIGNMENT_CLASS_MAP,
  PopoverAlignment,
  PopoverPositionClass,
} from './data-access/popover.interface';

@Component({
  selector: 'rng-popover',
  imports: [NgTemplateOutlet],
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent implements AfterViewInit, OnDestroy {
  public name = input<string>('');
  public alignment = input<PopoverAlignment | null>(null);
  public header = input<string | null>(null);
  public subtext = input<string | null>(null);
  public styleClass = input<string | null>(null);
  public changeEvent = output<IPopoverChangeEvent>();

  public headerContent = contentChild<TemplateRef<string>>('rngPopoverHeader');
  public subtextContent = contentChild<TemplateRef<string>>('rngPopoverSubtext');

  private _popoverEl = viewChild<ElementRef<HTMLElement>>('popoverEl');
  private _positionClass = signal<PopoverPositionClass>(null);

  private _resolvedClass = computed<PopoverPositionClass>(() => {
    const alignment = this.alignment();

    if (alignment) {
      return POPOVER_ALIGNMENT_CLASS_MAP[alignment];
    }

    return this._positionClass();
  });

  public isAlignedRight = computed<boolean>(() => this._resolvedClass() === 'rng-popover--right');
  public isAlignedTop = computed<boolean>(() => this._resolvedClass() === 'rng-popover--top');
  public isAlignedTopRight = computed<boolean>(() => this._resolvedClass() === 'rng-popover--top-right');

  public classNames = computed<string>(() => {
    const classes = ['rng-popover', 'rng-animation', 'rng-reveal'];
    const customClassName = this.styleClass();

    if (customClassName) {
      classes.push(customClassName);
    }

    return classes.join(' ');
  });

  private _controller = new AbortController();

  ngAfterViewInit(): void {
    const el = this._popoverEl()?.nativeElement;

    el?.addEventListener(
      'toggle',
      (event: ToggleEvent) => {
        this.changeEvent.emit({ type: event.newState === 'open' ? 'open' : 'close' });
      },
      { signal: this._controller.signal },
    );
  }

  ngOnDestroy(): void {
    this._controller.abort();
  }

  /**
   * Handle the native popover toggle event to recalculate position on open.
   *
   * @param event ToggleEvent
   * @returns void
   */
  public onToggle(event: ToggleEvent): void {
    if (event.newState !== 'open') {
      this._positionClass.set(null);
      return;
    }

    if (this.alignment()) {
      return;
    }

    setTimeout(() => this._calculatePosition());
  }

  /**
   * Calculate the popover position based on available space and update the position class accordingly.
   *
   * @returns void
   */
  private _calculatePosition(): void {
    const el = this._popoverEl()?.nativeElement;

    if (!el) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const isOverflowRight = rect.right > window.innerWidth;
    const isOverflowBottom = rect.bottom > window.innerHeight;

    if (isOverflowBottom && isOverflowRight) {
      this._positionClass.set('rng-popover--top-right');
    } else if (isOverflowBottom) {
      this._positionClass.set('rng-popover--top');
    } else if (isOverflowRight) {
      this._positionClass.set('rng-popover--right');
    } else {
      this._positionClass.set(null);
    }
  }

  /**
   * Close the popover by calling the native hidePopover method on the popover element
   *
   * @return void
   */
  public closePopover(): void {
    this._popoverEl()?.nativeElement?.hidePopover();
  }
}
