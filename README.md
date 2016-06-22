# panto-transformer-integrity
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[Integrity](https://w3c.github.io/webappsec-subresource-integrity/) transformer for panto.

```js
panto.loadTransformer('integrity');

panto.pick('**/*.{css,js}').pipe(panto.read()).pipe(panto.integrity()).end();
```

[npm-url]: https://npmjs.org/package/panto-transformer-integrity
[downloads-image]: http://img.shields.io/npm/dm/panto-transformer-integrity.svg
[npm-image]: http://img.shields.io/npm/v/panto-transformer-integrity.svg
[david-dm-url]:https://david-dm.org/pantojs/panto-transformer-integrity
[david-dm-image]:https://david-dm.org/pantojs/panto-transformer-integrity.svg
[david-dm-dev-url]:https://david-dm.org/pantojs/panto-transformer-integrity#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/pantojs/panto-transformer-integrity/dev-status.svg
