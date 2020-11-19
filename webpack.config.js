const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const production = process.env.NODE_ENV === 'production';

const config = {
  mode: production ? 'production' : 'development',
  entry: {
    index: path.resolve(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
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
      dry: false,
      verbose: true,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')]
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
      fix: true,
      exclude: ['node_modules', 'dist', 'demo/dist']
    }),
  ],
  externals: [nodeExternals()]
};

module.exports = config;
