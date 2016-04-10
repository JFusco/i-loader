'use strict';

export default class ILoader {
	constructor({
		async: async = false,
		onProgress: onProgress = null
	} = {}) {
		this.async = async;
		this.onProgress = onProgress;
	}

	load(imageUrl){
		if(typeof imageUrl === 'undefined'){
			throw new Error('You must provide at least one image URL');
		}

		if(typeof imageUrl !== 'string' && !Array.isArray(imageUrl)){
			throw new TypeError(`You must provide a String type or an Array of Strings - found type: ${typeof imageUrl}`);
		}

		this.counter = 0;
		this.completed = [];
		this.errors = [];

		if(Array.isArray(imageUrl)){
			this.imageQueue = imageUrl.slice(0);

			if(!this.async){
				const imagePromise = [];

				this.imageQueue.map(value => {
					imagePromise.push(
							this.loadImage(value)
					);
				});

				return Promise.all(imagePromise);
			}else{
				return this.imageQueue.reduce((promise, item) => {
					return promise.then(() => {
						return this.loadImage(item);
					});
				}, Promise.resolve());
			}
		}else{
			return this.loadImage(imageUrl);
		}
	}

	loadImage(img) {
		return new Promise((resolve, reject) => {
			const image = new Image();

			image.onload = event => {
				this.completed.push({
					image,
					event
				});

				const progressChunk = ((this.imageQueue) ? (100 / this.imageQueue.length) : 100) * this.completed.length;

				this.checkProgress(progressChunk).then(() => {
					resolve(this.completed);
				});
			};

			image.onerror = err => {
				this.errors.push({
					image,
					err
				});

				reject(this.errors);
			};

			image.src = img;
		});
	}

	checkProgress(progress) {
		return new Promise((resolve) => {
			const percentInterval = setInterval(() => {
				this.counter++;

				this.onProgress(Math.floor(this.counter));

				if(this.counter >= progress){
					this.counter = progress;

					clearInterval(percentInterval);

					resolve();
				}
			});
		});
	}
}