# Pagination

## Import

```ts
import { PaginationComponent } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [PaginationComponent]
})
```

## Usage

### Basic pagination

```ts
total = 120;
currentPage = 1;

onPageChange(event: IPaginationEvent): void {
  if (event.page) this.currentPage = event.page;
}
```

```html
<rng-pagination
  [total]="total"
  [selectedPageNumber]="currentPage"
  (changeEvent)="onPageChange($event)"></rng-pagination>
```

### Custom page size and max visible page items

```html
<rng-pagination
  [total]="total"
  [perPage]="25"
  [maxPageItem]="5"
  [selectedPageNumber]="currentPage"
  (changeEvent)="onPageChange($event)"></rng-pagination>
```

### Handling all event types

```ts
onPageChange(event: IPaginationEvent): void {
  switch (event.type) {
    case 'pageChange':
    case 'nextPage':
    case 'previousPage':
      this.currentPage = event.page;
      this.loadData();
      break;
    case 'pageSizeChange':
      this.pageSize = event.rowsPerPage;
      this.currentPage = 1;
      this.loadData();
      break;
  }
}
```

The component does not render when `total` is `0`. Page navigation is hidden when all records fit on one page, but the rows-per-page selector and info text are always shown when `total > 0`.

## API

### Inputs

| Input                | Type                 | Required | Default | Description                                                            |
| -------------------- | -------------------- | -------- | ------- | ---------------------------------------------------------------------- |
| `total`              | `number`             | Yes      | —       | Total number of records                                                |
| `perPage`            | `PageSizeOptionType` | No       | `10`    | Initial rows per page (`5 \| 10 \| 15 \| 17 \| 20 \| 25 \| 50 \| 100`) |
| `maxPageItem`        | `number`             | No       | `10`    | Maximum number of page number buttons to display                       |
| `selectedPageNumber` | `number`             | No       | `1`     | Currently active page (for external control)                           |

### Outputs

| Output        | Payload            | Description                                |
| ------------- | ------------------ | ------------------------------------------ |
| `changeEvent` | `IPaginationEvent` | Emitted on page change or page size change |

### IPaginationEvent

| Property      | Type                                                               | Description                                  |
| ------------- | ------------------------------------------------------------------ | -------------------------------------------- |
| `type`        | `'pageChange' \| 'nextPage' \| 'previousPage' \| 'pageSizeChange'` | Type of pagination action                    |
| `page`        | `number`                                                           | New page number (present for page events)    |
| `rowsPerPage` | `PageSizeOptionType`                                               | New page size (present for `pageSizeChange`) |
