import { a as defineEventHandler, c as createError, s as sequelize } from './nitro/node-server.mjs';
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

const labs_get = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  return await sequelize.query(`
        SELECT lab.*
        FROM lab      
    `, { type: QueryTypes.SELECT });
});

export { labs_get as default };
//# sourceMappingURL=labs.get.mjs.map
