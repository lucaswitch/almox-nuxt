import {defineEventHandler} from 'h3'
import {Appointment} from "~/server/utils/database/models";
import {StockEntry} from "~/server/utils/database/models";


export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusText: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    const {id} = await readBody<{ id: number | string }>(event);

    const appointment = await Appointment.findOne({where: {id}})
    await StockEntry.destroy({
        where: {
            appointment_id: appointment.id
        }
    })
    return await appointment.update({
        is_deleted: true
    })
})


