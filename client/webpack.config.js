const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Creates a new HTML file on bundle.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      }),
      // Places code and converts the service worker to work with the bundle.
      new InjectManifest({
        swSrc: './src-sw.js',
        // Make sure this makes the name in the index.js
        swDest: 'src-sw.js'
      }),
      // Sets of the mainfest creation for the web app to be downloadable.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'J.A.T.E',
        short_name: 'JATE',
        description: 'A Simple Text Editor.',
        background_color: '#141414',
        theme_color: '#141414',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          // Imports CSS into the bundle.
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            // Converts our code to an ES5 version in the bundle.
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
