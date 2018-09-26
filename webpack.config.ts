import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import CopyWebpackPlugin = require('copy-webpack-plugin');
import * as path from 'path';
import * as webpack from 'webpack';
import merge = require('webpack-merge');
import * as dotenv from 'dotenv';

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env as any).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify((env as any)[next]);
  return prev;
}, {});

const isDevelopment = process.env.NODE_ENV === 'development';

const commonConfig: webpack.Configuration = {
  entry: {
    app: [path.join(__dirname, 'src/app/index.tsx')],
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    pathinfo: false,
  },
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/app/index.html'),
    }),
    new webpack.DefinePlugin(envKeys),
    new CopyWebpackPlugin([{ from: 'public' }]),
    new MiniCssExtractPlugin(),
  ],
};

const devConfig = merge(commonConfig, {
  mode: 'development',
  entry: {
    app: ['react-hot-loader/patch', 'webpack-hot-middleware/client'],
  },
  output: {
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
  ],
});

let config = commonConfig;
if (isDevelopment) {
  config = devConfig;
}

export default config;
