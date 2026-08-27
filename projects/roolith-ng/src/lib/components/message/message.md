# Message

## Import

```ts
import { MessageComponent } from 'roolith-ng';
```

```ts
@Component({
  imports: [MessageComponent]
})
```

## Usage

### Default

```html
<rng-message>
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>
```

### With close button

```html
<rng-message
  [showClose]="true"
  type="info">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>
```

### Success

```html
<rng-message type="success">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>
```

### Danger

```html
<rng-message type="danger">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>
```

### Warning

```html
<rng-message type="warning">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>
```

### Info

```html
<rng-message type="info">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>
```

### Primary

```html
<rng-message type="primary">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>
```

### Custom Icon

```html
<rng-message
  type="warning"
  icon="clipboard">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>
```

## Event

```html
<rng-message
  [showClose]="true"
  type="info"
  (closeEvent)="onMessageClose()">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eaque doloremque sequi excepturi iste illo saepe
  enim ducimus natus? Enim ipsam nisi unde, reprehenderit quas provident. Nisi tenetur possimus recusandae.
</rng-message>
```

## Notes

- Content is projected via `<ng-content>` — pass any text or HTML as child content.
- The message hides itself (`is--hidden`) when the close button is clicked; it does not remove itself from the DOM.
- When no `icon` input is provided, a default icon is resolved based on `type` (`check` for success, `alert` for danger, `info` for all others).

## API

### Inputs

| Input       | Type                                                                     | Default     | Description                                  |
| ----------- | ------------------------------------------------------------------------ | ----------- | -------------------------------------------- |
| `type`      | `'default' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'primary'` | `'default'` | Visual variant of the message                |
| `showClose` | `boolean`                                                                | `false`     | Whether to show the clear/close button       |
| `icon`      | `IconNameType \| null`                                                   | `null`      | Override the default icon for the given type |

### Outputs

| Output       | Payload | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `closeEvent` | `void`  | Emitted when the close button is clicked |
