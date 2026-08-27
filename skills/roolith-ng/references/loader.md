# Loader

## Import

```ts
import { LoaderComponent, InlineLoaderComponent, LoaderService } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [LoaderComponent, InlineLoaderComponent]
})
```

## Setup

Place `<rng-loader>` once in your root layout template so it is globally available:

```html
<rng-loader />
```

Inject `LoaderService` in any component or service to control the loader:

```ts
import { LoaderService } from '@im4all/roolith-ng';

@Component({ ... })
export class MyComponent {
  private loaderService = inject(LoaderService);
}
```

## Usage

### Blocking loader (default)

Covers the full viewport and blocks user interaction.

```ts
this.loaderService.show();
```

```ts
this.loaderService.hide();
```

### Blocking loader with custom message

```ts
this.loaderService.show('Saving changes...');
```

### Non-blocking loader

Displays the loader without blocking interaction.

```ts
this.loaderService.showNonBlocking();
```

```ts
this.loaderService.hide();
```

### Non-blocking loader with custom message

```ts
this.loaderService.showNonBlocking('Loading data...');
```

### Usage in an async operation

```ts
async loadData(): Promise<void> {
  this.loaderService.show('Fetching records...');
  try {
    await this.dataService.fetchAll();
  } finally {
    this.loaderService.hide();
  }
}
```

---

## Inline Loader

`rng-inline-loader` is a lightweight, self-contained spinner for use inline within UI elements (buttons, cards, table cells, etc.). It does not depend on `LoaderService`.

### Import

```ts
import { InlineLoaderComponent } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [InlineLoaderComponent]
})
```

### Basic usage

```html
<rng-inline-loader />
```

Renders a spinner with the default `Loading...` text.

### Custom label

Content projection overrides the default label:

```html
<rng-inline-loader>Fetching data...</rng-inline-loader>
```

### Inside a button

```html
<button [disabled]="isLoading()">
  @if (isLoading()) {
    <rng-inline-loader>Saving...</rng-inline-loader>
  } @else {
    Save
  }
</button>
```

---

## API — LoaderService

| Method            | Signature                                 | Description                                                       |
| ----------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| `show`            | `show(message?: string): void`            | Shows the blocking loader. Default message: `'Processing...'`     |
| `showNonBlocking` | `showNonBlocking(message?: string): void` | Shows the non-blocking loader. Default message: `'Processing...'` |
| `hide`            | `hide(): void`                            | Hides the loader and resets all state                             |
| `isLoading`       | `Signal<boolean>` (readonly)              | Whether the loader is currently visible                           |
| `isNonBlocking`   | `Signal<boolean>` (readonly)              | Whether the loader is in non-blocking mode                        |
| `message`         | `Signal<string \| null>` (readonly)       | The current loader message                                        |
