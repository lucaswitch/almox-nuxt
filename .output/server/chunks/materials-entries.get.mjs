import { a as defineEventHandler, c as createError, g as getQuery, S as StockEntry } from './nitro/node-server.mjs';
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

const materialsEntries_get = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const query = getQuery(event);
  return await StockEntry.findAll({ where: { material_id: query.id } });
});

export { materialsEntries_get as default };
//# sourceMappingURL=materials-entries.get.mjs.map
