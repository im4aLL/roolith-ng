# Breadcrumb

## Import

```ts
import { BreadcrumbComponent } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [BreadcrumbComponent]
})
```

## Usage

```ts
import { IBreadcrumbItem } from '@im4all/roolith-ng';

breadcrumbs: IBreadcrumbItem[] = [
  { label: 'Home', link: '/home' },
  { label: 'Daily shift overview', link: '/shifts' },
  { label: 'Shift summary' },
];

onBreadcrumbClick(item: IBreadcrumbItem): void {
  // navigate using item.link
}
```

```html
<rng-breadcrumb
  [data]="breadcrumbs"
  (clickEvent)="onBreadcrumbClick($event)"></rng-breadcrumb>
```

The last item in the array is automatically marked as active.

## API

### Inputs

| Input  | Type                | Default | Description                         |
| ------ | ------------------- | ------- | ----------------------------------- |
| `data` | `IBreadcrumbItem[]` | `[]`    | Array of breadcrumb items to render |

### Outputs

| Output       | Payload           | Description                                                                   |
| ------------ | ----------------- | ----------------------------------------------------------------------------- |
| `clickEvent` | `IBreadcrumbItem` | Emitted when any breadcrumb item is clicked (default navigation is prevented) |

### IBreadcrumbItem

| Property | Type     | Required | Description                              |
| -------- | -------- | -------- | ---------------------------------------- |
| `label`  | `string` | Yes      | Display text of the breadcrumb item      |
| `link`   | `string` | No       | href value; falls back to `#` if omitted |
