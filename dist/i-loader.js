'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ILoader = function () {
	function ILoader() {
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref$async = _ref.async;
		var async = _ref$async === undefined ? false : _ref$async;
		var _ref$onProgress = _ref.onProgress;
		var onProgress = _ref$onProgress === undefined ? null : _ref$onProgress;
		(0, _classCallCheck3.default)(this, ILoader);

		this.async = async;
		this.onProgress = onProgress;
	}

	(0, _createClass3.default)(ILoader, [{
		key: 'load',
		value: function load(imageUrl) {
			var _this = this;

			if (typeof imageUrl === 'undefined') {
				throw new Error('You must provide at least one image URL');
			}

			if (typeof imageUrl !== 'string' && !Array.isArray(imageUrl)) {
				throw new TypeError('You must provide a String type or an Array of Strings - found type: ' + (typeof imageUrl === 'undefined' ? 'undefined' : (0, _typeof3.default)(imageUrl)));
			}

			this.counter = 0;
			this.completed = [];
			this.errors = [];

			if (Array.isArray(imageUrl)) {
				this.imageQueue = imageUrl.slice(0);

				if (!this.async) {
					var _ret = function () {
						var imagePromise = [];

						_this.imageQueue.map(function (value) {
							imagePromise.push(_this.loadImage(value));
						});

						return {
							v: _promise2.default.all(imagePromise)
						};
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
				} else {
					return this.imageQueue.reduce(function (promise, item) {
						return promise.then(function () {
							return _this.loadImage(item);
						});
					}, _promise2.default.resolve());
				}
			} else {
				return this.loadImage(imageUrl);
			}
		}
	}, {
		key: 'loadImage',
		value: function loadImage(img) {
			var _this2 = this;

			return new _promise2.default(function (resolve, reject) {
				var image = new Image();

				image.onload = function (event) {
					_this2.completed.push({
						image: image,
						event: event
					});

					var progressChunk = (_this2.imageQueue ? 100 / _this2.imageQueue.length : 100) * _this2.completed.length;

					_this2.checkProgress(progressChunk).then(function () {
						resolve(_this2.completed);
					});
				};

				image.onerror = function (err) {
					_this2.errors.push({
						image: image,
						err: err
					});

					reject(_this2.errors);
				};

				image.src = img;
			});
		}
	}, {
		key: 'checkProgress',
		value: function checkProgress(progress) {
			var _this3 = this;

			return new _promise2.default(function (resolve) {
				var percentInterval = setInterval(function () {
					_this3.counter++;

					_this3.onProgress(Math.floor(_this3.counter));

					if (_this3.counter >= progress) {
						_this3.counter = progress;

						clearInterval(percentInterval);

						resolve();
					}
				});
			});
		}
	}]);
	return ILoader;
}();

exports.default = ILoader;