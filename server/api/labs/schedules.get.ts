import {QueryTypes} from "sequelize";

export default defineEventHandler(async function (event) {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }

    let {user_id} = getQuery<{ user_id: string | number | undefined, quantity: string | number }>(event);

    return await sequelize.query(`
        select     
            appointment.*,
            lab.name as name,
            user.id as user_id,
            user.full_name as full_name
        from 
            appointment
            inner join lab on lab.id = appointment.lab_id
            inner join user on user.id = appointment.scheduled_by
        where appointment.is_deleted = 0
        ORDER BY appointment.id desc, appointment.scheduled_from desc           
    `, {type: QueryTypes.SELECT})
})



