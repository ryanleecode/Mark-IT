import compress = require('compression');
import * as debug from 'debug';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import webpack = require('webpack');
import webpackDevMiddleware = require('webpack-dev-middleware');
import webpackHotMiddleware = require('webpack-hot-middleware');
import webpackConfig from '../../webpack.config';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(compress());

const { path: outputPath, publicPath } = webpackConfig.output!;
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

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

app.get('*', (req, res) =>
  res.sendFile(path.resolve(outputPath!, 'index.html')),
);

app.listen(port, () =>
  debug('info')(`Server is running on port http://localhost:${port}/`),
);
