"use strict";
const moment = require("moment")

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /*
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
         */

        const dates = [
            moment().utc().add(5, 'days').format("YYYY/MM/DD HH:mm:ss"),
            moment().utc().add(6, 'days').format("YYYY/MM/DD HH:mm:ss"),
        ]

        for (const date of dates) {

        }
    },

    async down(queryInterface, Sequelize) {
        //await queryInterface.bulkDelete(Appointment.tableName, null, {});
    }
};
