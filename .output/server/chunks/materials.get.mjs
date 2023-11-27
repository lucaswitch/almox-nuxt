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

const materials_get = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  return await sequelize.query(`
        SELECT material.*, sum(stock_entry.amount) as quantity, count(stock_entry.amount) as entries
        FROM material
            LEFT JOIN stock_entry ON stock_entry.material_id = material.id           
        GROUP BY material.id        
    `, { type: QueryTypes.SELECT });
});

export { materials_get as default };
//# sourceMappingURL=materials.get.mjs.map
