"use strict";
const moment = require("moment")

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const {Material} = await import('../models/index.js')
        await queryInterface.bulkInsert(Material.tableName, [
            {
                name: "Água",
                metric: "litros",
                created_at: moment().utc().format("YYYY/MM/DD HH:mm:ss"),
                updated_at: moment().utc().format("YYYY/MM/DD HH:mm:ss")
            }, {
                name: "Leite",
                metric: "litros",
                created_at: moment().utc().format("YYYY/MM/DD HH:mm:ss"),
                updated_at: moment().utc().format("YYYY/MM/DD HH:mm:ss")
            },
            {
                name: "Café",
                metric: "gramas",
                created_at: moment().utc().format("YYYY/MM/DD HH:mm:ss"),
                updated_at: moment().utc().format("YYYY/MM/DD HH:mm:ss")
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(Material.tableName, null, {});
    }
};
