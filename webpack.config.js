const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js',		//JS for index page
		about: './src/js/about.js'	//JS for about Page
	},
	output: {						
		filename: '[name].bundle.js',			//Add name plceholder to create multiple bundle files.			
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader']
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),	//Add on top, And Add the folder name which one you want to clean.
		new ExtractTextPlugin('styles.css'),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/views/index.html',
			chunks: ['app']
		}),
		new HtmlWebpackPlugin({
			filename: 'about.html',
			template: 'src/views/about.html',
			chunks: ['about']
		}),
	    new BrowserSyncPlugin(
			// BrowserSync options
			{
				// browse to http://localhost:3000/ during development
				host: 'localhost',
				port: 3000,
				// proxy the Webpack Dev Server endpoint
				// (which should be serving on http://localhost:3100/)
				// through BrowserSync
				proxy: 'http://localhost:8080/'
			},
				// plugin options
			{
				// prevent BrowserSync from reloading the page
				// and let Webpack Dev Server take care of this
				reload: false
			}
		)
	]
};