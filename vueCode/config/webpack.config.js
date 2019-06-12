var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack')

var config = require('./config');

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'crm/static/js/[name].[chunkhash].js',
    chunkFilename: 'crm/static/js/chunks/[id].[chunkhash].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.js',
      '@res': path.resolve(__dirname, 'res'),
      '@src': path.resolve(__dirname, '../src'),
      '$lib': path.resolve(__dirname, '../src/lib'),
      '@views': path.resolve(__dirname, '../src/views'),
      '@utils': path.resolve(__dirname, '../src/lib/utils'),
      '@filters': path.resolve(__dirname, '../src/filters'),
      '@api': path.resolve(__dirname, '../src/api'),
      '@constants': path.resolve(__dirname, '../src/constants'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.attached\.less$/,
        use: [
          { loader: 'style-loader/useable' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.less$/,
        exclude: /\.attached\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ],
          publicPath: ''
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: 'crm/static/fonts/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        
        options: {
          limit: 1000,
          name: path.posix.join('crm', 'static/images/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': config.dev.env
    }),
    new ExtractTextPlugin(path.posix.join('crm', 'static/css/[name].[contenthash].css')),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      favicon: path.resolve('favicon.ico')
    })
  ],
  devServer: {
    host: 'localhost',
    // host: 'http://192.168.0.113',
    port: 8090,
    disableHostCheck: true,
    //proxy: {
      //'/': 'http://192.168.1.72:8080',
      // '/admin': 'http://10.1.53.114:8080',
      // '/admin': 'http://10.1.17.86:8084',
      // '/admin': 'http://10.1.11.44:80',
        // target: 'http://10.1.11.44:8083', //后端测试环境 
        // target: 'http://10.1.11.44:8082', //后端开发环境

        // target: 'http://10.1.17.79:8010', //
        // target:'http://10.1.17.86:8010',//

        // target: 'http://10.1.11.44:80' // devServer
        // target: 'http://10.1.11.44:81' // testServer,
      //'/bms':'http://10.1.11.48:80'
    //}
  }    
}
