import { a as defineEventHandler, c as createError, r as readBody, M as Material } from './nitro/node-server.mjs';
import { M as MaterialSchema } from './validation.mjs';
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
import 'moment';

const materials_post = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const body = await readBody(event);
  try {
    await MaterialSchema.validate(body);
  } catch (err) {
    createError({
      statusCode: 400,
      statusMessage: "Dados de material inv\xE1lidos."
    });
  }
  const { name, formula, concentration, weight, brand, observation, metric } = body;
  try {
    return await Material.create({
      name,
      formula,
      concentration,
      weight,
      brand,
      observation,
      metric
    });
  } catch (err) {
    createError({
      statusCode: 500,
      statusMessage: "N\xE3o foi poss\xEDvel adicionar este material"
    });
  }
});

export { materials_post as default };
//# sourceMappingURL=materials.post.mjs.map
