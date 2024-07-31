var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const Dotenv = require('dotenv-webpack');
require("dotenv").config();
const MY_VALUE = process.env.MY_VALUE|| ''


module.exports = {
	entry: [
		'./src/js/main.js',
	],
	output: {
		// path: path.resolve(__dirname, 'dist'),
		// filename: 'bundle.js',
		// publicPath: './dist/',
		// // clean: true,
		// filename: 'bundle.js'
		// path: path.resolve(__dirname, 'dist'),
		// filename: 'bundle.js',
		// publicPath: '',
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// publicPath: '/dist/'
		publicPath: process.env.NODE_ENV === 'production' ? '' : '/dist/',
	},
	resolve: {
		extensions: ['.js', '.css'],
		alias: {
			Utilities: path.resolve(__dirname, './../node_modules/'),
			process: "process/browser"
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {url: false}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: ['babel-loader']
			},
			{
				test: /\.(pdf|gif|png|jpe?g|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			process: 'process/browser.js'
		}),
		new webpack.DefinePlugin({
			VERSION: JSON.stringify(require("./package.json").version),
			'process.env.MY_VALUE': JSON.stringify(process.env.MY_VALUE)
		}),
		new webpack.EnvironmentPlugin( { ...process.env } ),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			inject: "head",
			// inject: 'body',
		}),
		new MiniCssExtractPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'images', to: 'images' }
			],
		})


	],
	devtool: "cheap-module-source-map",
	devServer: {
		// host: '0.0.0.0',
		// contentBase: "./",
		static: {
			directory: path.resolve(__dirname, "./"),
		},
		// open: true,
		// hot: true,
		// compress: true,
	}
};