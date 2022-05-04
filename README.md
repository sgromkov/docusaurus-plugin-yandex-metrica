# 📦 docusaurus-plugin-yandex-metrica

[Yandex Metrica](https://metrika.yandex.ru) plugin for [Docusaurus v2](https://docusaurus.io/).

### ⚠️ production only

This plugin is always inactive in development and only active in production to avoid polluting the analytics statistics.

## Installation

Install the plugin with npm:

```bash
npm install --save docusaurus-plugin-yandex-metrica
```

or with yarn:
```bash
yarn add docusaurus-plugin-yandex-metrica
```

## Add the plugin to the config file

Add the plugin and the counter ID to your `docusaurus.config.js`:

```js
module.exports = {
  plugins: [
    ['docusaurus-plugin-yandex-metrica', {
      counterID: '86645179',
    }],
  ],
};
```

## Configuration

Accepted fields:

<small>

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `counterID` | `number` | **Required** | The tracking ID of your Metrica service. |
| `webvisor` | `boolean` | `false` | Enable Session Replay (Webvisor), scroll map, form analysis |
| `ecommerce` | `string` | `false` | Enable E-commerce (to use it pass the "Container name") |
| `trackHash` | `boolean` | `false` | Enable Hash tracking in the browser address bar |
| `alternativeCdn` | `boolean` | `false` | Use Alternative CDN |

</small>

🤷‍♂️ Didn't find the required field? [Create an Issue](https://github.com/sgromkov/docusaurus-plugin-yandex-metrica/issues/new) and request the desired field.
