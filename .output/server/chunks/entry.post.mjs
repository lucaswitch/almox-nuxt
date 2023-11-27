import { a as defineEventHandler, c as createError, r as readBody, S as StockEntry } from './nitro/node-server.mjs';
import moment from 'moment';
import { E as EntrySchema } from './validation.mjs';
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
import 'yup';
import 'yup-locale-pt';

const entry_post = defineEventHandler(async function(event) {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const body = await readBody(event);
  const { amount, material_id } = body;
  try {
    await EntrySchema.validate({ amount });
  } catch (err) {
    const errors = {};
    errors[err.path] = err.message;
    return createError({
      status: 400,
      statusText: "Ocorreu um erro de valida\xE7\xE3o.",
      data: errors
    });
  }
  const quantity = await getCurrentQuantity(material_id);
  const newQuantity = quantity + amount;
  if (newQuantity < 0) {
    return createError({
      status: 400,
      statusText: "Quantidade em estoque insuficiente.",
      data: { amount: "Quantidade em estoque insuficiente." }
    });
  }
  const created_at = moment().utc().format("YYYY-MM-DD HH:mm:ss");
  const updated_at = created_at;
  return await StockEntry.create({
    user_id: event.context.user.id,
    material_id,
    amount,
    created_at,
    updated_at
  });
});
async function getCurrentQuantity(material_id) {
  return await StockEntry.sum("amount", {
    where: {
      material_id
    }
  });
}

export { entry_post as default };
//# sourceMappingURL=entry.post.mjs.map
