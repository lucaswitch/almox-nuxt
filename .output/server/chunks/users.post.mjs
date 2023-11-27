import { a as defineEventHandler, c as createError, r as readBody, U as User } from './nitro/node-server.mjs';
import { U as UserSchema } from './validation.mjs';
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

const users_post = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      message: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  } else if (event.context.user.role !== 0) {
    createError({
      statusCode: 403,
      message: "Apenas usu\xE1rios autenticados e admin podem utilizar esta rota."
    });
  }
  const body = await readBody(event);
  const {
    full_name,
    username,
    password,
    type,
    id = null
  } = body;
  try {
    await UserSchema.validate(body);
  } catch (err) {
    const errors = {};
    errors[err.path] = err.message;
    return createError({
      statusCode: 400,
      message: "O usu\xE1rio j\xE1 existe.",
      errors
    });
  }
  let user = null;
  if (id) {
    user = await User.findByPk(id);
    if (user) {
      await user.update({
        username,
        password,
        role: type === "Admin" ? 0 : 1,
        full_name,
        is_deleted: false
      });
    }
    return user;
  }
  user = await doesUserWithUsernameExists(username);
  if (!user) {
    user = await User.create({
      username,
      password,
      role: type === "Admin" ? 0 : 1,
      full_name,
      is_deleted: false
    });
    return user;
  }
  if (!user.is_deleted) {
    createError({
      statusCode: 400,
      message: "O usu\xE1rio j\xE1 existe.",
      errors: {
        username: 'O usu\xE1rio com este "username" j\xE1 existe.'
      }
    });
  } else if (user.role === 0) {
    createError({
      statusCode: 400,
      message: "O \xE9 admin.",
      errors: {
        username: "Este usu\xE1rio \xE9 admin e n\xE3o pode ser editado exceto por ele mesmo."
      }
    });
  }
});
async function doesUserWithUsernameExists(username) {
  return await User.findOne({ where: { username } });
}

export { users_post as default };
//# sourceMappingURL=users.post.mjs.map
