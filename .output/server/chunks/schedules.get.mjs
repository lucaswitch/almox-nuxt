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

const schedules_get = defineEventHandler(async function(event) {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  getQuery(event);
  return await sequelize.query(`
        select     
            appointment.*,
            lab.name as name,
            user.id as user_id,
            user.full_name as full_name
        from 
            appointment
            inner join lab on lab.id = appointment.lab_id
            inner join user on user.id = appointment.scheduled_by
        where appointment.is_deleted = 0
        ORDER BY appointment.id desc, appointment.scheduled_from desc           
    `, { type: QueryTypes.SELECT });
});

export { schedules_get as default };
//# sourceMappingURL=schedules.get.mjs.map
