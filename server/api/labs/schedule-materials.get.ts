import {QueryTypes} from "sequelize";

export default defineEventHandler(async function (event) {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }

    const {appointment_id} = getQuery<{
        appointment_id: string | number | undefined,
        quantity: string | number
    }>(event);

    return await sequelize.query(`
        select material.*, sum(stock_entry.amount) as quantity, count(stock_entry.amount) as entries
        from 
            appointment
            inner join lab on lab.id = appointment.lab_id
            inner join user on user.id = appointment.scheduled_by
            inner join stock_entry on stock_entry.appointment_id = appointment.id
            inner join material on material.id = stock_entry.material_id            
        where appointment.is_deleted = 0 and appointment.id = :appointment_id
        group by material.id         
    `, {
        replacements: {appointment_id},
        type: QueryTypes.SELECT
    })
})



