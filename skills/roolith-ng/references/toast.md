# Toast

## Import

```ts
import { ToastComponent, ToastService } from '@im4all/roolith-ng';
```

## Setup

Place `<rng-toast>` once in your root layout template so it is globally available:

```html
<rng-toast />
```

Inject `ToastService` in any component or service to trigger toasts:

```ts
import { ToastService } from '@im4all/roolith-ng';

@Component({ ... })
export class MyComponent {
  private toastService = inject(ToastService);
}
```

## Usage

### Success toast

```ts
this.toastService.success('Record saved successfully.');
```

### Error toast

```ts
this.toastService.error('Failed to load data. Please try again.');
```

### Info toast

```ts
this.toastService.info('Your session will expire in 5 minutes.');
```

### With custom title

```ts
this.toastService.success('All 12 records were imported.', 'Import Complete');
this.toastService.error('Connection timed out.', 'Network Error');
```

### Usage after an async operation

```ts
async saveRecord(): Promise<void> {
  try {
    await this.dataService.save(this.form.value);
    this.toastService.success('Record saved successfully.', 'Saved');
  } catch {
    this.toastService.error('Could not save the record.', 'Error');
  }
}
```

### Dismiss all toasts

```ts
this.toastService.clear();
```

Toasts auto-dismiss after **3 seconds**. A maximum of **3 toasts** are shown at the same time; older ones are dropped when the limit is reached.

## API — ToastService

| Method    | Signature                                        | Description                                       |
| --------- | ------------------------------------------------ | ------------------------------------------------- |
| `success` | `success(message: string, title?: string): void` | Shows a success toast. Default title: `'Success'` |
| `error`   | `error(message: string, title?: string): void`   | Shows an error toast. Default title: `'Error'`    |
| `info`    | `info(message: string, title?: string): void`    | Shows an info toast. Default title: `'Info'`      |
| `show`    | `show(toast: IToast): void`                      | Shows a fully custom toast object                 |
| `clear`   | `clear(): void`                                  | Dismisses all active toasts immediately           |
| `items`   | `Signal<IToast[]>` (readonly)                    | Array of currently visible toast items            |

### IToast

| Property  | Type                             | Required | Description            |
| --------- | -------------------------------- | -------- | ---------------------- |
| `type`    | `'success' \| 'error' \| 'info'` | Yes      | Visual variant         |
| `message` | `string`                         | Yes      | Body text of the toast |
| `title`   | `string`                         | Yes      | Heading of the toast   |
