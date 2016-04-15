# i-loader
[![npm][npm-version-image]][npm-url]
[![Build Status](https://travis-ci.org/JFusco/i-loader.svg?branch=master)](https://travis-ci.org/JFusco/i-loader)
[![devDependency Status](https://david-dm.org/JFusco/i-loader/dev-status.svg)](https://david-dm.org/JFusco/i-loader#info=devDependencies)

> Async or parallel, single image or multi image loader with progress using native Promises.

ILoader is a very lightweight object to help with parallel and sequential image loading in an application. **ILoader has 
no UI** - it simply returns the consumer a progress/complete via callback/Promise based on the image queue that is passed in.

## Getting Started ##
#### Install
```sh
npm install i-loader --save-dev
```

#### Usage
##### Import
```js
import ILoader from 'i-loader';
```
##### Mutliple images
```js
const imageLoader = new ILoader({
	onProgress(progress){
		console.log(`progress on the queue ${progress}`);
	}
});

/*
 * Call load and pass in an array of images
 * load() returns a promise
 */
imageLoader.load([
	'image-1.jpg',
	'image-2.jpg',
	'image-3.jpg',
	'image-4.jpg'
]).then(() => {
	console.log('Queue is complete!');
});
```

##### Single image
```js
const imageLoader = new ILoader({
	onProgress(progress){
		console.log(`progress on the queue ${progress}`);
	}
});

/*
 * Call load and pass in a string
 */
imageLoader.load(
	'image-2.jpg'
).then(() => {
	console.log('Queue is complete!');
});
```
## Options
There are a couple of options you can pass in to the constructor

* **`async`** - Default is `false` - Pass `true` to have images load in sequential order
* **`onProgress`** - Default is `null` - Function that returns progress, from 0-100

## Tests
```sh
npm test
```

## License

 * [MIT License](http://www.opensource.org/licenses/mit-license.php)

[npm-url]: https://npmjs.org/package/i-loader
[npm-version-image]: https://img.shields.io/npm/v/npm.svg?maxAge=2592000