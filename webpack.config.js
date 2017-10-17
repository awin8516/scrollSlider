const path = require('path');

module.exports = {
  entry: './src/scrollSlider.js',
  output: {
    filename: 'scrollSlider.min.js',
    path: path.resolve(__dirname, 'dist')
  },
	module:{
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader:  'babel-loader',
      },      
     { test: /\.css$/, loader: 'style-loader!css-loader' },
	 { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ],
  }
};