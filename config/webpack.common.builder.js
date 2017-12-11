
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const constant = {
  WORK_DIR: 'app',
};

function build({ entry = {}, additionalExternals = {} }) {
  //
  const config = {
    //
    resolve: {
      modules: [path.resolve(__dirname, constant.WORK_DIR), 'node_modules'],
      descriptionFiles: ["package.json"],
      extensions: ['.js', '.jsx']
    },

    module: {
      loaders: [
        {
          test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
          loader: "file-loader?publicPath=./&name=font/[name].[ext]"
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=10000&publicPath=./&name=img/[name].[ext]'
        },
        {
          test: /\.css$/,
          exclude: path.join(process.cwd(), `/${constant.WORK_DIR}`),
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?sourceMap'
          })
        },
        {
          test: /\.css$/,
          include: path.join(process.cwd(), `/${constant.WORK_DIR}`),
          loader: 'raw-loader'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        },
        {
          test: /\.js/,
          loader: 'imports-loader?define=>false'
        },
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['react-hot-loader']
        },
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-2', 'react'],
            compact: false
          }
        },
        {
          test: /jquery\.flot\.resize\.js$/,
          loader: 'imports-loader?this=>window'
        },
      ]
    },

    resolveLoader: {
      alias: {
        'rtlcss-loader': path.join(__dirname, 'rtlcss-loader.js')
      }
    },

    plugins: [
      new webpack.DefinePlugin({
        WP_BASE_HREF: '/'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[hash].js'
      }),
      new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new HtmlWebpackPlugin({
        template: `${constant.WORK_DIR}/index.html`,
        baseUrl: '/',
        xhtml: true
      }),
      new ExtractTextPlugin('[name].[hash].css'),
    ],

    externals: {},
  };


  if (!entry) {
    throw new Error(`Entry is empty. It must be define webpack.dev.js and webpack.prod.js. -> entry: ${entry}`);
  }
  config.entry = entry;

  Object.assign(config.externals, additionalExternals);

  return config;
}


module.exports = build;
