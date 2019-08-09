"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);
var _Page = require('../app/models/Page'); var _Page2 = _interopRequireDefault(_Page);
var _Album = require('../app/models/Album'); var _Album2 = _interopRequireDefault(_Album);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _File2.default, _Page2.default, _Album2.default];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

exports. default = new Database();
