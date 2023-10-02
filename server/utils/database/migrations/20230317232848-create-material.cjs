"use strict";
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("material", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      formula: {
        allowNull: true,
        type: Sequelize.STRING
      },
      concentration: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      weight: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      brand: {
        allowNull: true,
        type: Sequelize.STRING
      },
      observation: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      metric: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("material");
  }
};
