"use strict";
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stock_entry", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      stock_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: { model: "stock", key: "id" }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: { model: "user", key: "id" }
      },
      withdrawn_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      received_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable("stock_entry");
  }
};
