'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            username: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            full_name: {
                type: Sequelize.STRING
            },
            role: {
                type: DataTypes.SMALLINT,
                allowNull: false,
                default: 0
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
        await queryInterface.dropTable('user');
    }
};
