import {defineEventHandler} from 'h3'
import {Appointment, Lab, StockEntry} from "~/server/utils/database/models";
import moment from "moment";
import {ScheduleSchema} from "~/server/utils/validation";
import {Op} from "sequelize";
import {getMomentToSequelize} from "~/utils/formatter";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusText: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    const {appointment_id, material_id, quantity} = await readBody<{
        quantity: number,
        appointment_id: number,
        material_id: number
    }>(event);

    const created_at = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    const updated_at = created_at;
    return await StockEntry.create({
        user_id: event.context.user.id,
        material_id,
        amount: +quantity,
        appointment_id,
        created_at,
        updated_at
    })
})



