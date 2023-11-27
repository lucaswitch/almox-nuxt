import { a as defineEventHandler, c as createError, g as getQuery, s as sequelize } from './nitro/node-server.mjs';
import { QueryTypes } from 'sequelize';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'jsonwebtoken';
import 'dotenv';

const scheduleMaterials_get = defineEventHandler(async function(event) {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const { appointment_id } = getQuery(event);
  return await sequelize.query(`
        select material.*, sum(stock_entry.amount) as quantity, count(stock_entry.amount) as entries
        from 
            appointment
            inner join lab on lab.id = appointment.lab_id
            inner join user on user.id = appointment.scheduled_by
            inner join stock_entry on stock_entry.appointment_id = appointment.id
            inner join material on material.id = stock_entry.material_id            
        where appointment.is_deleted = 0 and appointment.id = :appointment_id
        group by material.id         
    `, {
    replacements: { appointment_id },
    type: QueryTypes.SELECT
  });
});

export { scheduleMaterials_get as default };
//# sourceMappingURL=schedule-materials.get.mjs.map
