import { a as defineEventHandler, c as createError, r as readBody, L as Lab, A as Appointment, S as StockEntry } from './nitro/node-server.mjs';
import moment from 'moment';
import { S as ScheduleSchema } from './validation.mjs';
import { Op } from 'sequelize';
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
import 'yup';
import 'yup-locale-pt';

function getMomentToSequelize(m) {
  if (m) {
    return new Date(m.unix() * 1e3);
  }
  return null;
}

const schedule_post = defineEventHandler(async (event) => {
  if (!event.context.user) {
    createError({
      statusCode: 403,
      statusText: "Apenas usu\xE1rios autenticados podem utilizar esta rota."
    });
  }
  const body = await readBody(event);
  const { lab_id, scheduled_from, scheduled_to, note, materials = [] } = body;
  const scheduledFrom = moment.utc(scheduled_from, "DD/MM/YYYY HH:mm");
  const scheduledTo = moment.utc(scheduled_to, "DD/MM/YYYY HH:mm");
  try {
    await ScheduleSchema.validate({
      lab_id,
      scheduled_from,
      scheduled_to,
      note
    });
    const lab = await Lab.findOne({ where: { id: lab_id } });
    if (!lab) {
      return createError({
        statusCode: 500,
        statusText: "N\xE3o foi poss\xEDvel encontrar este laborat\xF3rio"
      });
    }
    const found = await Appointment.findOne({
      where: {
        lab_id,
        scheduled_from: {
          [Op.between]: [
            getMomentToSequelize(scheduledFrom),
            getMomentToSequelize(scheduledTo)
          ]
        },
        scheduled_to: {
          [Op.between]: [
            getMomentToSequelize(scheduledFrom),
            getMomentToSequelize(scheduledTo)
          ]
        }
      }
    });
    if (found) {
      return createError({
        statusCode: 500,
        statusText: "Este laborat\xF3rio j\xE1 esta agendado para esta data."
      });
    }
    console.error(scheduledFrom.format("YYYY-MM-DD HH:mm") + ":00");
    const created = await Appointment.create({
      lab_id,
      note,
      scheduled_by: event.context.user.id,
      scheduled_from: getMomentToSequelize(scheduledFrom),
      scheduled_to: getMomentToSequelize(scheduledTo),
      created_at: getMomentToSequelize(moment()),
      updated_at: getMomentToSequelize(moment())
    });
    if (materials.length) {
      for (const { quantity, material_id } of materials) {
        const currentQuantity = await getCurrentQuantity(material_id);
        if (currentQuantity - quantity > -1) {
          const created_at = moment().utc().format("YYYY-MM-DD HH:mm:ss");
          const updated_at = created_at;
          await StockEntry.create({
            user_id: event.context.user.id,
            material_id,
            amount: -quantity,
            appointment_id: created.id,
            created_at,
            updated_at
          });
        }
      }
    }
    return created;
  } catch (err) {
    console.error(err);
    return createError({
      statusCode: 500,
      statusText: "N\xE3o foi poss\xEDvel adicionar esta agenda de laboratorio."
    });
  }
});
async function getCurrentQuantity(material_id) {
  return await StockEntry.sum("amount", {
    where: {
      material_id
    }
  });
}

export { schedule_post as default };
//# sourceMappingURL=schedule.post.mjs.map
