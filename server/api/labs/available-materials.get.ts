import {defineEventHandler} from 'h3'
import {StockEntry} from "~/server/utils/database/models";
import {QueryTypes} from "sequelize";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }

    return await sequelize.query(`
        SELECT material.*, sum(stock_entry.amount) as quantity, count(stock_entry.amount) as entries
        FROM material
            LEFT JOIN stock_entry ON stock_entry.material_id = material.id           
        GROUP BY material.id        
    `, {type: QueryTypes.SELECT})
})
