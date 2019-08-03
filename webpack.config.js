const path = require('path');

module.exports = {
  entry: './client/index.js',
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
  module:{
    rules:[
      { test: /\.jsx?/, 
        exclude: /(node_modules|bower_components)/, 
        use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env','@babel/preset-react'],
          }
        }
    },
      {
        test:/\.(css|scss)$/,
        use:[
          'style-loader',
          'css-loader',
          'node-sass',
          'sass-loader'
        ]
      }
    ]
  },
  mode: process.NODE_ENV,
  devServer: {
    publicPath: '/dist/',
    proxy: {
      '/': 'http://localhost:3000',
      '/api': 'http://localhost:3000'
    }
  }
}