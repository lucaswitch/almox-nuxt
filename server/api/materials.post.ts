import {Material} from "~/server/utils/database/models";
import {MaterialSchema} from "~/server/utils/validation";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    const body = await readBody(event);
    try {
        await MaterialSchema.validate(body);
    } catch (err) {
        createError({
            statusCode: 400,
            statusMessage: 'Dados de material inválidos.'
        })
    }

    const {name, formula, concentration, weight, brand, observation, metric} = body;
    try {
        return await Material.create({
            name, formula, concentration, weight, brand, observation, metric
        });
    } catch (err) {
        createError({
            statusCode: 500,
            statusMessage: 'Não foi possível adicionar este material'
        })
    }
})
