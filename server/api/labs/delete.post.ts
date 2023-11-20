import {defineEventHandler} from 'h3'
import {Lab} from "~/server/utils/database/models";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    const query = await getQuery(event);

    let lab: Lab | null = null
    if (query?.lab_id) {
        lab = await Lab.findOne({
            where: {
                id: query.lab_id
            }
        })
    }
    if (!lab) {
        return createError({
            statusCode: 404,
            statusMessage: 'Não foi possível encontrar este laboratório'
        })
    }

    try {
        return await lab.destroy()
    } catch (err) {
        createError({
            statusCode: 500,
            statusMessage: 'Não foi possível remover este laboratório'
        })
    }
})
