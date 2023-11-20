import {defineEventHandler} from 'h3'
import {Lab} from "~/server/utils/database/models";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    const body = await readBody(event);

    try {
        const lab = await Lab.create(body)
        if (!lab) {
            return createError({
                statusCode: 500,
                statusMessage: 'Não foi possível adicionar este laboratório'
            })
        }
    } catch (err) {
        console.error(err);
        return createError({
            statusCode: 500,
            statusMessage: 'Não foi possível adicionar este laboratório'
        })
    }
})
