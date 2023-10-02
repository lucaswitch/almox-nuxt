import {Material} from "~/server/utils/database/models";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }

    const {limit = null, offset = null} = getQuery(event)
    return await getMaterials({limit, offset})
})

/**
 * Obtém os materiais.
 * @param limit
 * @param offset
 */
async function getMaterials({limit = 1000, offset = 0}) {
    return await Material.findAll({limit, offset});
}
