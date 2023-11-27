import { a as defineEventHandler, c as createError, g as getQuery, r as readBody, L as Lab } from './nitro/node-server.mjs';
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

const update_post = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const query = await getQuery(event);
  const body = await readBody(event);
  let lab = null;
  if (query == null ? void 0 : query.lab_id) {
    lab = await Lab.findOne({
      where: {
        id: query.lab_id
      }
    });
  }
  if (!lab) {
    return createError({
      statusCode: 404,
      statusMessage: "N\xE3o foi poss\xEDvel encontrar este laborat\xF3rio"
    });
  }
  try {
    return await lab.update(body);
  } catch (err) {
    createError({
      statusCode: 500,
      statusMessage: "N\xE3o foi poss\xEDvel adicionar este laborat\xF3rio"
    });
  }
});

export { update_post as default };
//# sourceMappingURL=update.post.mjs.map
