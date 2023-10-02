'use strict';
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('user', [{
            full_name: 'Lucas Alves',
            username: 'lucaswitch',
            password: 'password',
            created_at: moment().utc().format('YYYY/MM/DD HH:mm:ss'),
            updated_at: moment().utc().format('YYYY/MM/DD HH:mm:ss')
        }, {
            full_name: 'Luca Meurer',
            username: 'meurer',
            password: 'password',
            created_at: moment().utc().format('YYYY/MM/DD HH:mm:ss'),
            updated_at: moment().utc().format('YYYY/MM/DD HH:mm:ss')
        }], {});
    },

    async down(queryInterface, Sequelize) {
    }
};
