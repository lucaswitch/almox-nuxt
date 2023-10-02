import { a as defineEventHandler, c as createError, r as readBody, M as Material } from './nitro/node-server.mjs';
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
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

Yup.setLocale(pt);
const { object, string, number } = Yup;
const MaterialSchema = object({
  name: string().required("O nome do material \xE9 requerido").min(1).max(100),
  formula: string().typeError("Preencha uma f\xF3rmula v\xE1lida.").required("A formula do material \xE9 requerido").min(1).max(100),
  concentration: number().typeError("Preencha um n\xFAmero v\xE1lido.").required("A concentra\xE7\xE3o do material \xE9 requerido").min(1).max(100),
  weight: number().required("O peso do material \xE9 requerido").min(0).max(1e4),
  metric: string().required("A unidade do material \xE9 requerido").max(25),
  note: string().required("A observa\xE7\xE3o do material \xE9 requerido").max(1e3)
});

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
