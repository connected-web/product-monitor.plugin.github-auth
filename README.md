# Product Monitor Github Auth Plugin
Adds github authentication to product monitor, and enables the secure pages feature.

## Development

```
npm install
npm test
```

## Exposed methods
### plugin()
Creates a new instance of the plugin.

```js
var plugin = require('product-monitor.plugin.github-auth')();
```

### plugin.apply(app)
Applies the plugin to a product-monitor app.
- Enables authentication via github
- Enables the _secure pages_ feature of `product-monitor`

### plugin.info()
Returns the `name`, `description`, and `keywords` for the plugin:

```js
{
    name: 'product-monitor.plugin.github-auth',
    description: 'Adds github authentication to product monitor, and enables the secure pages feature',
    keywords: [
      'product-monitor',
      'nodejs',
      'plugin',
      'passport',
      'local-auth'
    ]
}
```

### plugin.getConfig()
Returns the config applied to the plugin.

### plugin.setConfig(pluginConfig)
Changes the config applied to the plugin.

## Change Log
### 1.0.0
- Initial release
