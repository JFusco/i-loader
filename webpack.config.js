var path = require('path');

module.exports = {
	entry: './src/test.js',
	output: {
		path: __dirname+'/dist',
		filename: 'i-loader.js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				include: [
					path.join(__dirname, 'src')
				],
				test: /\.js?$/,
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	resolve: {
		extensions: ['', '.js']
	}
};