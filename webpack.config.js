var webpack = require('webpack');
module.exports = {
  devtool: 'source-map',
  target: 'node',
  entry: {
    app: ['webpack/hot/dev-server', './javascript/entry.js'],
  },
  node: {
    __dirname: true,
    net: "empty",
    tls: "empty",
    fs:  "empty"
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
      { test: /\.js$/, loader: 'babel?presets[]=stage-2,presets[]=es2015,presets[]=react&plugins[]=transform-class-properties', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
