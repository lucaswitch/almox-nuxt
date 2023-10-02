import { a as defineEventHandler, c as createError, g as getQuery, M as Material } from './nitro/node-server.mjs';
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

const materials_get = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const { limit = null, offset = null } = getQuery(event);
  return await getMaterials({ limit, offset });
});
async function getMaterials({ limit = 1e3, offset = 0 }) {
  return await Material.findAll({ limit, offset });
}

export { materials_get as default };
//# sourceMappingURL=materials.get.mjs.map
