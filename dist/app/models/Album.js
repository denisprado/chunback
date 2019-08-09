"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Album extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: _sequelize2.default.STRING,
        content: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.File);
    this.belongsTo(models.File, { foreignKey: 'thumb', as: 'thumbImage' });
  }
}

exports. default = Album;
