const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const webpack = require('webpack');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const PATHS = {
  build: path.resolve(__dirname, 'build'),
  css: path.resolve(__dirname, 'src', 'css', 'app.scss'),
  favIcon: path.resolve(__dirname, 'src', 'favicon.png'),
  inlineCss: path.resolve(__dirname, 'src', 'css', 'inline.scss'),
  src: path.resolve(__dirname, 'src'),
};

const cssLoaders = [{
  loader: 'css-loader',
  query: { minimize: true, sourceMap: !IS_PRODUCTION },
}, {
  loader: 'postcss-loader',
}, {
  loader: 'sass-loader',
  query: { sourceMap: !IS_PRODUCTION, sourceMapContents: !IS_PRODUCTION },
}];

const plugins = [
  new CleanWebpackPlugin([PATHS.build], { root: __dirname }),
  new HtmlWebpackPlugin({
    favicon: PATHS.favIcon,
    hash: false,
    inject: 'body',
    template: path.resolve(PATHS.src, 'index.html'),
  }),
  new ExtractTextPlugin('inline.css'),
  new StyleExtHtmlWebpackPlugin(),
  new webpack.LoaderOptionsPlugin({ options: {
    postcss: [autoprefixer({ browsers: ['last 3 versions', '> 1%'] })],
    context: path.resolve(__dirname),
  } }),
];

if (!IS_PRODUCTION) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    output: { comments: false },
    sourceMap: true,
  }));
}

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: path.resolve(PATHS.src, 'app.js'),
  },
  output: {
    filename: '[name].[hash:8].js',
    path: PATHS.build,
  },
  module: {
    loaders: [
      {
        test: /\.(gif|jpeg|jpg|png|svg)$/,
        loader: 'url-loader',
        query: { limit: 10000, name: 'assets/[name].[hash:8].[ext]' },
      }, {
        test: /\.html$/,
        loader: 'html-loader',
        query: { interpolate: true, minimize: true },
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [['es2015', { modules: false }]],
        },
      }, {
        test: /\.scss$/,
        exclude: PATHS.inlineCss,
        include: PATHS.css,
        loader: [{ loader: 'style-loader' }].concat(cssLoaders),
      }, {
        test: /\.scss$/,
        exclude: PATHS.css,
        include: PATHS.inlineCss,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: cssLoaders,
        }),
      },
    ],
  },
  plugins,
};
