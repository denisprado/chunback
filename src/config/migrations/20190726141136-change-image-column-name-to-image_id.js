'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('pages', 'image', 'image_id');
  },

  down: queryInterface => {
    return queryInterface.renameColumn('pages', 'image_id', 'image');
  },
};
