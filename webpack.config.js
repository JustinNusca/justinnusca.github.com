const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const webpack = require('webpack');

const IS_PROD = process.env.NODE_ENV === 'production';

const PATHS = {
  build: path.resolve(__dirname, 'build'),
  css: path.resolve(__dirname, 'src', 'css', 'app.scss'),
  favIcon: path.resolve(__dirname, 'src', 'favicon.png'),
  src: path.resolve(__dirname, 'src'),
};

const cssLoaders = [{
  loader: 'css-loader',
  query: { minimize: true, sourceMap: !IS_PROD },
}, {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [autoprefixer({ browsers: ['last 3 versions', '> 1%'] })],
    sourceMap: !IS_PROD,
  },
}, {
  loader: 'sass-loader',
  query: { sourceMap: !IS_PROD, sourceMapContents: !IS_PROD },
}];

const plugins = [
  new CleanWebpackPlugin([PATHS.build]),
  new HtmlWebpackPlugin({
    favicon: PATHS.favIcon,
    template: path.resolve(PATHS.src, 'index.html'),
  }),
  new StyleExtHtmlWebpackPlugin(),
  new ExtractTextPlugin('app.css'),
];

if (!IS_PROD) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    output: { comments: false },
    sourceMap: !IS_PROD,
  }));
}

module.exports = {
  devtool: IS_PROD ? 'nosources-source-map' : 'eval-source-map',
  entry: { app: path.resolve(PATHS.src, 'app.js') },
  module: {
    rules: [{
      include: PATHS.css,
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: cssLoaders,
      }),
    }, {
      test: /\.(gif|jpeg|jpg|png|svg)$/,
      use: 'url-loader',
    }, {
      test: /\.html$/,
      use: 'html-loader',
    }, {
      include: PATHS.src,
      test: /\.js$/,
      use: 'babel-loader',
    }, {
      test: /(CNAME)$/,
      loader: 'static-loader',
    }],
  },
  output: {
    filename: '[name].[hash:8].js',
    path: PATHS.build,
  },
  plugins,
};
