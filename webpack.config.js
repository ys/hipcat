var webpack = require('webpack');
module.exports = {
  entry: {
  app: ['webpack/hot/dev-server', './javascript/entry.js'],
},
output: {
  path: './public/built',
  filename: 'bundle.js',
  publicPath: 'http://localhost:8080/built/'
},
devServer: {
  contentBase: './public',
  publicPath: 'http://localhost:8080/built/'
},
module: {
 loaders: [
   { test: /\.js$/, loader: 'babel?presets[]=es2015,presets[]=react', exclude: /node_modules/ },
   { test: /\.css$/, loader: 'style-loader!css-loader' },
   { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}
 ]
},
 plugins: [
   new webpack.HotModuleReplacementPlugin()
 ]
}
