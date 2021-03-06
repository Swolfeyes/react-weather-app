const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/index.js',

  output: {
    filename: 'bundle.js',
    publicPath: './dist',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'app'),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          { loader: 'babel-loader' },
        ]
      },
      {
        test: /\.(svg|jpg)$/,
        include: path.join(__dirname, 'app'),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          { loader: 'file-loader',
            options: {
              name: '/assets/[name].[ext]'
            },
         },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                'app/styles',
              ],
            },
          },
        ],
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    mainFiles: ['index', 'main'],
    modules: [
      'app',
      'node_modules',
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      PropTypes: 'prop-types',
      React: 'react',
      ReactDOM: 'react-dom',
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'eval',

  devServer: {
    hot: true,
    open: true,
    publicPath: '/',
    inline: true,
    overlay: true,
    port: 9000,
    stats: {
      modules: false,
      colors: true,
      env: false,
      publicPath: true,
      timings: true,
      version: true,
      errors: true,
    },
  },

};
