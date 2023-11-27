import { a as defineEventHandler, c as createError, r as readBody, A as Appointment, S as StockEntry } from './nitro/node-server.mjs';
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
import 'sequelize';
import 'jsonwebtoken';
import 'dotenv';

const scheduleCancel_post = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusText: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const { id } = await readBody(event);
  const appointment = await Appointment.findOne({ where: { id } });
  await StockEntry.destroy({
    where: {
      appointment_id: appointment.id
    }
  });
  return await appointment.update({
    is_deleted: true
  });
});

export { scheduleCancel_post as default };
//# sourceMappingURL=schedule-cancel.post.mjs.map
