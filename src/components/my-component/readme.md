# my-component



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description           | Type     | Default     |
| -------- | --------- | --------------------- | -------- | ----------- |
| `first`  | `first`   | The first name        | `string` | `undefined` |
| `last`   | `last`    | The last name         | `string` | `undefined` |
| `max`    | `max`     | Maximum counter value | `number` | `10`        |
| `middle` | `middle`  | The middle name       | `string` | `undefined` |
| `min`    | `min`     | Minimum counter value | `number` | `0`         |


## Events

| Event             | Description                          | Type                   |
| ----------------- | ------------------------------------ | ---------------------- |
| `countChanged`    | Emitted when the counter changes     | `CustomEvent<number>`  |
| `greetingToggled` | Emitted when the greeting is toggled | `CustomEvent<boolean>` |


## Methods

### `reset() => Promise<void>`

Reset the counter to zero

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
