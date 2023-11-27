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

const checkMaterialQuantity_get = defineEventHandler(async function(event) {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  let { material_id, quantity } = getQuery(event);
  if (typeof material_id !== "number") {
    material_id = parseInt(material_id, 10);
  }
  if (typeof quantity !== "number") {
    quantity = parseInt(quantity, 10);
  }
  const currentQuantity = await getCurrentQuantity(material_id);
  const newQuantity = currentQuantity - quantity;
  return newQuantity > -1;
});
async function getCurrentQuantity(material_id) {
  return await StockEntry.sum("amount", {
    where: {
      material_id
    }
  });
}

export { checkMaterialQuantity_get as default };
//# sourceMappingURL=check-material-quantity.get.mjs.map
