import { a as defineEventHandler, c as createError, r as readBody, S as StockEntry } from './nitro/node-server.mjs';
import moment from 'moment';
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

const scheduleGiveBack_post = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusText: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const { appointment_id, material_id, quantity } = await readBody(event);
  const created_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  const updated_at = created_at;
  return await StockEntry.create({
    user_id: event.context.user.id,
    material_id,
    amount: +quantity,
    appointment_id,
    created_at,
    updated_at
  });
});

export { scheduleGiveBack_post as default };
//# sourceMappingURL=schedule-give-back.post.mjs.map
