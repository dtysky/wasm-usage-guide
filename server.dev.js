/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/29
 */

const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.dev.config');
config.plugins.push(
  new webpack.DefinePlugin({
    'globalEnv': {
      NODE_ENV: JSON.stringify('development'),
//      NODE_ENV: JSON.stringify('production'),
    }
  })
);

const express = require('express');
const app = new express();
const port = 8888;

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}));
app.use(webpackHotMiddleware(compiler));

app.use((req, res, next) => {
  if (['.wasm'].includes(path.extname(req.url))) {
      res.setHeader('mime-type', 'application/wasm');
  }
  return next();
});

app.use('/',
  express.static(`${__dirname}/src`)
);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/index.html`)
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
