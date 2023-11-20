import {defineEventHandler} from 'h3'
import {Appointment, Lab} from "~/server/utils/database/models";
import moment from "moment";
import {ScheduleSchema} from "~/server/utils/validation";
import {Op, QueryTypes} from "sequelize";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    const body = await readBody(event);

    const {lab_id, scheduled_from, scheduled_to, note} = body;
    try {
        await ScheduleSchema.validate({
            lab_id,
            scheduled_from,
            scheduled_to,
            note
        })
        const lab = await Lab.findOne({where: {id: lab_id}})
        if (!lab) {
            return createError({
                statusCode: 500,
                statusMessage: 'Não foi possível encontrar este laboratório'
            })
        }
        const scheduledFrom = moment(scheduled_from, 'DD/MM/YYYY HH:mm')
        const scheduledTo = moment(scheduled_to, 'DD/MM/YYYY HH:mm')
        const found = await Appointment.findOne({
            where: {
                lab_id,
                scheduled_from: {
                    [Op.between]: [scheduledFrom.utc().format('YYYY-MM-DD HH:mm:00'), scheduledTo.utc().format('YYYY-MM-DD HH:mm:00')]
                },
                scheduled_to: {
                    [Op.between]: [scheduledFrom.utc().format('YYYY-MM-DD HH:mm:00'), scheduledTo.utc().format('YYYY-MM-DD HH:mm:00')]
                }
            }
        })
        if (found) {
            return createError({
                statusCode: 500,
                statusMessage: 'Este laboratório já esta agendado para esta data.'
            })
        }

        return await Appointment.create({
            lab_id,
            note,
            scheduled_by: event.context.user.id,
            scheduled_from: scheduledFrom.utc().format('YYYY-MM-DD HH:mm:00'),
            scheduled_to: scheduledTo.utc().format('YYYY-MM-DD HH:mm:00'),
            created_at: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        })

    } catch (err) {
        console.error(err);
        return createError({
            statusCode: 500,
            statusMessage: 'Não foi possível adicionar esta agenda de laboratorio.'
        })
    }
})
