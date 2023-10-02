"use strict";
const moment = require("moment");

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const {Lab} = await import('../models/index.js')

        await queryInterface.bulkInsert(Lab.tableName, [
            {
                name: "Laboratório A",
                created_at: moment().utc().format("YYYY/MM/DD HH:mm:ss"),
                updated_at: moment().utc().format("YYYY/MM/DD HH:mm:ss")
            }, {
                name: "Laboratório B",
                created_at: moment().utc().format("YYYY/MM/DD HH:mm:ss"),
                updated_at: moment().utc().format("YYYY/MM/DD HH:mm:ss")
            },
            {
                name: "Laboratório C",
                created_at: moment().utc().format("YYYY/MM/DD HH:mm:ss"),
                updated_at: moment().utc().format("YYYY/MM/DD HH:mm:ss")
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(Lab.tableName, null, {});
    }
};
