'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('appointment', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            lab_id: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            scheduled_by: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            note: {
                allowNull: false,
                type: Sequelize.STRING
            },
            student_capacity: {
                allowNull: true,
                type: Sequelize.INTEGER,
                default: 1
            },
            scheduled_at: {
                allowNull: false,
                type: Sequelize.DATE
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
        await queryInterface.dropTable('appointment');
    }
};
