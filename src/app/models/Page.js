import Sequelize, { Model } from 'sequelize';

class Page extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        content: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image' });
  }
}

export default Page;
