import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    const URL =
      process.env.NODE_ENV === 'production'
        ? `${process.env.APP_URL_PROD}/files/${this.path}`
        : `${process.env.APP_URL}/files/${this.path}`;
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return URL;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Album, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  }
}

export default File;
