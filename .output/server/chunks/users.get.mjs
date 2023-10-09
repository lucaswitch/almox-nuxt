import { a as defineEventHandler, c as createError, g as getQuery, U as User } from './nitro/node-server.mjs';
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

const users_get = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusMessage: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const { limit = null, offset = null, id = null } = getQuery(event);
  if (id) {
    return await getUser(id);
  }
  return await getUsers({ limit, offset });
});
async function getUser(id) {
  return await User.findOne({
    attributes: [
      "id",
      "username",
      "full_name",
      "role"
    ],
    where: {
      id,
      is_deleted: false
    }
  });
}
async function getUsers({ limit = 1e3, offset = 0 }) {
  return await User.findAll({
    limit,
    offset,
    attributes: [
      "id",
      "username",
      "full_name",
      "role"
    ],
    where: {
      is_deleted: false
    }
  });
}

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
