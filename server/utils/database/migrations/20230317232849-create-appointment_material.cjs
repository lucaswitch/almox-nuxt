'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('appointment_material', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            material_id: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            appointment_id: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('appointment_material');
    }
};
