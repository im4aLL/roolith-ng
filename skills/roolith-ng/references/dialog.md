# Dialog

## Import

```ts
import { DialogHostComponent, DialogComponent, DialogService } from '@im4all/roolith-ng';
```

## Setup

Place `<rng-dialog-host>` once in your root layout template:

```html
<rng-dialog-host />
```

Inject `DialogService` in any component or service to open dialogs:

```ts
import { DialogService } from '@im4all/roolith-ng';

@Component({ ... })
export class MyComponent {
  private dialogService = inject(DialogService);
}
```

## Usage

### Simple confirmation dialog

```ts
const { event, destroy } = this.dialogService.open({
  header: 'Delete Record',
  content: 'Are you sure you want to delete this record?',
  actionButtons: [
    { label: 'Delete', value: 'confirm', variant: 'danger' },
    { label: 'Cancel', value: 'cancel' },
  ],
});

effect(() => {
  const e = event();
  if (!e) return;
  if (e.value === 'confirm') {
    this.deleteRecord();
  }
  destroy();
});
```

### Dialog with subheader and custom width

```ts
this.dialogService.open({
  header: 'Upload File',
  subheader: 'Supported formats: PDF, XLSX',
  width: 600,
  actionButtons: [
    { label: 'Upload', value: 'upload', variant: 'primary' },
    { label: 'Cancel', value: 'cancel' },
  ],
});
```

### Default dialog (no config)

```ts
const { event, destroy } = this.dialogService.open();
// Opens with: header "Confirmation", content "Are you sure...",
// buttons: Yes (primary) + Cancel
```

### Using `rng-dialog` directly (without the service)

```html
<rng-dialog
  header="Confirm Action"
  subheader="This cannot be undone"
  [width]="480"
  [footerButtons]="buttons"
  (actionEvent)="onAction($event)"
  (closeEvent)="onClose()">
  <p>Custom dialog body content goes here.</p>
</rng-dialog>
```

Pressing `Escape` also triggers `closeEvent`.

## API

### DialogService

| Method      | Signature                                           | Description                                                 |
| ----------- | --------------------------------------------------- | ----------------------------------------------------------- |
| `open`      | `open(config?: Partial<IDialogConfig>): IDialogRef` | Opens a dialog. Returns a signal `event` and a `destroy` fn |
| `close`     | `close(): void`                                     | Closes the dialog and emits `'close'` event                 |
| `emitEvent` | `emitEvent(value: string): void`                    | Manually emits an event with the given value                |
| `isOpen`    | `Signal<boolean>` (readonly)                        | Whether the dialog is currently open                        |
| `config`    | `Signal<IDialogConfig>` (readonly)                  | The current dialog configuration                            |

### IDialogConfig

| Property        | Type                    | Default                                                                                      | Description                          |
| --------------- | ----------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`            | `string`                | auto-generated                                                                               | Unique dialog identifier             |
| `header`        | `string`                | `'Confirmation'`                                                                             | Dialog title                         |
| `content`       | `string`                | `'Are you sure you want to proceed?'`                                                        | Body text (used by `rng-dialog-host`) |
| `subheader`     | `string`                | —                                                                                            | Optional subtitle below the header   |
| `width`         | `number`                | `400`                                                                                        | Width of the dialog in pixels        |
| `actionButtons` | `IDialogFooterButton[]` | `[{ label: 'Yes', value: 'yes', variant: 'primary' }, { label: 'Cancel', value: 'cancel' }]` | Footer action buttons                |

### IDialogFooterButton

| Property  | Type                | Required | Description                     |
| --------- | ------------------- | -------- | ------------------------------- |
| `label`   | `string`            | Yes      | Button label text               |
| `value`   | `string`            | Yes      | Value emitted via `actionEvent` |
| `variant` | `ButtonVariantType` | No       | Button visual variant           |

### `rng-dialog` Inputs

| Input           | Type                    | Required | Description               |
| --------------- | ----------------------- | -------- | ------------------------- |
| `header`        | `string`                | Yes      | Dialog title              |
| `width`         | `number`                | No       | Width in pixels           |
| `subheader`     | `string`                | No       | Subtitle below the header |
| `footerButtons` | `IDialogFooterButton[]` | No       | Footer action buttons     |

### `rng-dialog` Outputs

| Output        | Payload  | Description                                            |
| ------------- | -------- | ------------------------------------------------------ |
| `closeEvent`  | `void`   | Emitted when the close (×) button or Escape is pressed |
| `actionEvent` | `string` | Emitted with the `value` of the clicked footer button  |
