import {StockEntry} from "~/server/utils/database/models";
import {defineEventHandler} from 'h3'

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }

    const query = getQuery(event);
    return await StockEntry.findAll({where: {material_id: query.id}})
})
