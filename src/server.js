/**
 * Created by bolorundurowb on 2019-03-25
 */

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

const routes = require('./routes/Routes');
const Logger = require('./config/Logger');

if (cluster.isMaster) {
  var cpuCount = os.cpus().length;

  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
} else {
  const app = express();
  const router = express.Router();
  const port = process.env.PORT || 3000;

  app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  routes.route(router);
  app.use('/v1/', router);

  app.use('/docs', express.static('apidoc'), (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/apidoc/index.html'));
  });

  app.use('/', express.static('public'), (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
  });

  app.use((req, res, next) => {
    res.status(501).send({
      message: 'This API does not support that request.'
    });
    next();
  });

  app.listen(port, () => Logger.log(`Server started on ${port}`));
}

cluster.on('exit', function (worker) {
  Logger.log('Worker %d died :(', worker.id);
  cluster.fork();
});
