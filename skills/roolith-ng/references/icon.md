# Icon

## Import

```ts
import { IconComponent } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [IconComponent]
})
```

## Usage

### Basic icon

```html
<rng-icon name="calendar" />
```

### Sized icon

```html
<rng-icon
  name="settings"
  size="small" />
<rng-icon name="settings" />
<rng-icon
  name="settings"
  size="large" />
```

### Fixed pixel width

```html
<rng-icon
  name="home"
  [width]="24" />
```

### With additional CSS class

```html
<rng-icon
  name="alert"
  styleClass="my-custom-class" />
```

### Custom and third-party icons

The built-in `name` maps to a generated `rng-icon--<name>` class whose artwork comes from the library's SCSS (mask-image).

For icons that live outside the library (your own SVGs, or a third-party icon font such as Font Awesome), pass `custom` and supply the class(es) yourself. In custom mode the base `rng-icon` class is omitted, so the library's mask/background styling does not interfere with glyph fonts.

```html
<!-- Your own SVG icon: provide .rng-icon--example in your own SCSS -->
<rng-icon name="example" [custom]="true" />

<!-- Third-party icon font: pass the full space-separated class list -->
<rng-icon name="fa fa-user" [custom]="true" />
```

```scss
/* Your own SCSS */
.rng-icon--example {
  mask-image: inline-svg('<svg ...>...</svg>');
  -webkit-mask-image: inline-svg('<svg ...>...</svg>');
}
```

## API

### Inputs

| Input        | Type                              | Required | Default     | Description                                                                         |
| ------------ | --------------------------------- | -------- | ----------- | ----------------------------------------------------------------------------------- |
| `name`       | `IconNameType \| string`          | Yes      | —           | Name of the icon. A built-in name generates `rng-icon--<name>`; any string is allowed |
| `size`       | `'default' \| 'small' \| 'large'` | No       | `'default'` | Predefined size variant                                                             |
| `styleClass` | `string`                          | No       | —           | Additional CSS class(es) to apply to the icon                                       |
| `width`      | `number \| null`                  | No       | `null`      | Explicit width (and height) in pixels                                              |
| `custom`     | `boolean`                         | No       | `false`     | When `true`, uses `name` as-is for the class and skips the `rng-icon` base class      |

### Available Icon Names (`IconNameType`)

`home`, `bar-chart`, `clipboard`, `clock`, `file-text`, `sliders`, `file`, `settings`, `task-list`, `calendar`, `dot-circle`, `plus`, `location`, `users`, `users-settings`, `arrow-union`, `chevron-down`, `left-circle-solid`, `help`, `left`, `right`, `more`, `select`, `check`, `sort`, `sort-up`, `sort-down`, `search`, `arrow-left`, `arrow-right`, `delete`, `sidebar`, `logout`, `toggle-mode`, `minus`, `info`, `alert`, `spinner`, `check-solid`, `xmark-solid`, `bookmark-circle-solid`, `minus-circle-solid`, `redo-circle-solid`, `filter`, `filter-solid`, `filter-list`, `user`, `plus-square`, `minus-square`, `edit`, `download`, `more-vertical`, `file-csv`, `file-code`
