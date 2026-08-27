export type PopoverAlignment = 'right' | 'top' | 'top-right';
export type PopoverPositionClass = 'rng-popover--right' | 'rng-popover--top' | 'rng-popover--top-right' | null;

export const POPOVER_ALIGNMENT_CLASS_MAP: Record<PopoverAlignment, PopoverPositionClass> = {
  right: 'rng-popover--right',
  top: 'rng-popover--top',
  'top-right': 'rng-popover--top-right',
};

export interface IPopoverChangeEvent {
  type: 'open' | 'close';
}
