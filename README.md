# docusaurus-plugin-yandex-metrica

[Yandex.Metrica](https://metrika.yandex.ru) plugin for Docusaurus v2.

## Installation

Install the plugin with npm or yarn:

```bash npm2yarn
npm install --save docusaurus-plugin-yandex-metrica
```

Add the plugin and the counter ID to your `docusaurus.config.js`:

```js
module.exports = {
  plugins: [
    'docusaurus-plugin-yandex-metrica'
  ],
  themeConfig: {
    customFields: {
      ym: {
        counterID: '86645179',
      },
    }
  },
};
```

## Configuration

Accepted fields:

<small>

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `counterID` | `number` | **Required** | The tracking ID of your Metrica service. |

</small>
