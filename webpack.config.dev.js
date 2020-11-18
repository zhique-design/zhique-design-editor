const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const config = {
  mode: production ? 'production' : 'development',
  entry: {
    app: path.resolve(__dirname, 'demo', 'src', 'demo.tsx'),
  },
  output: {
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].chunk.[hash:8].js',
    path: path.resolve(__dirname, 'demo', 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
      maxSize: 200000,
      automaticNameDelimiter: '.'
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  devServer: {
    port: 8000,
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  devtool: production ? false : 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)(x?)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude:/node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              modules: {
                namedExport: false,
              },
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              esModule: true
            }
          },
          'less-loader',
        ]
      },
      {
        test: /\.(css|less)$/,
        include:/node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif|eot|woff|ttf|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.(ts|js)(x?)$/,
        exclude: /node_modules/,
        use: [
          'source-map-loader',
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'demo', 'dist')]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'demo', 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
      chunkFilename: 'static/css/[name].chunk.[hash:8].css',
      name: true
    }),
    new WebpackBar({ profile: true }),
    new StylelintPlugin({
      context: 'src',
      configFile: path.resolve(__dirname, '.stylelintrc'),
      files: '**/*.less',
      fix: true,
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: true
    }),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      failOnWarning: true,
      overrideConfigFile: path.join(__dirname, '.eslintrc.js'),
      fix: true,
    }),
  ]
};

module.exports = config;
