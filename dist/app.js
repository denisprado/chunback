"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});require('dotenv/config');
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(_express2.default.json());
    this.server.use(_cors2.default.call(void 0, { origin: process.env.FRONT_URL }));
    this.server.use(
      '/files',
      _express2.default.static(_path2.default.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(_routes2.default);
  }
}

exports. default = new App().server;
