import compress = require('compression');
import * as debug from 'debug';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import webpack = require('webpack');
import webpackDevMiddleware = require('webpack-dev-middleware');
import webpackHotMiddleware = require('webpack-hot-middleware');
import webpackConfig from '../../webpack.config';
import history = require('connect-history-api-fallback');
import { default as analyticsRouter } from './analyticsRouter';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(compress());

app.use('/api/analytics', analyticsRouter);

const { path: outputPath, publicPath } = webpackConfig.output!;
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(history());
  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'warn',
      publicPath: publicPath!,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static(outputPath!));
}
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  app.get('*', (req, res) => res.sendFile(path.resolve(publicPath!)));
} else {
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(outputPath!, 'index.html')),
  );
}

app.get('*', (req, res) =>
  res.sendFile(path.resolve(outputPath!, 'index.html')),
);

app.listen(port, () =>
  debug('info')(`Server is running on port http://localhost:${port}/`),
);
