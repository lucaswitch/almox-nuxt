import { a as defineEventHandler, c as createError, r as readBody, L as Lab } from './nitro/node-server.mjs';
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

const create_post = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const body = await readBody(event);
  try {
    const lab = await Lab.create(body);
    if (!lab) {
      return createError({
        statusCode: 500,
        statusMessage: "N\xE3o foi poss\xEDvel adicionar este laborat\xF3rio"
      });
    }
  } catch (err) {
    console.error(err);
    return createError({
      statusCode: 500,
      statusMessage: "N\xE3o foi poss\xEDvel adicionar este laborat\xF3rio"
    });
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
