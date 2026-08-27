# Progress

## Import

```ts
import { ProgressComponent } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [ProgressComponent]
})
```

## Usage

### Basic

```html
<rng-progress
  label="File upload"
  [value]="70" />
```

### Custom max value

```html
<rng-progress
  label="Tasks completed"
  [value]="3"
  [max]="10" />
```

### Without label

```html
<rng-progress [value]="45" />
```

### Without percentage value

```html
<rng-progress
  label="Loading"
  [value]="60"
  [showValue]="false" />
```

### Dynamic value (signal binding)

```ts
public uploadProgress = signal<number>(0);
```

```html
<rng-progress
  label="Uploading..."
  [value]="uploadProgress()" />
```

## API

### `rng-progress` Inputs

| Input       | Type             | Default | Description                                           |
| ----------- | ---------------- | ------- | ----------------------------------------------------- |
| `value`     | `number`         | `0`     | Current progress value                                |
| `max`       | `number`         | `100`   | Maximum value; percentage is calculated against this  |
| `label`     | `string \| null` | `null`  | Label displayed above the progress bar                |
| `showValue` | `boolean`        | `true`  | Whether to show the computed percentage next to label |

### Notes

- `percentage` is computed as `Math.round((value / max) * 100)` and clamped to `0–100`.
- The header row (label + percentage) is omitted from the DOM entirely when both `label` is `null` and `showValue` is `false`.
- The native `<progress>` element includes `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` for accessibility.
