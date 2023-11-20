import {defineEventHandler} from 'h3'
import {QueryTypes} from "sequelize";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    return await sequelize.query(`
        SELECT lab.*
        FROM lab      
    `, {type: QueryTypes.SELECT})
})
