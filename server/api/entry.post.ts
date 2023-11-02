import {MaterialSchema} from "~/server/utils/validation";
import {Material} from "~/server/utils/database/models";
import StockEntry from "~/server/utils/database/models/stock_entry";

export default defineEventHandler(async function (event) {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    const body = await readBody(event);


    // try {
    //     await MaterialSchema.validate(body);
    // } catch (err) {
    //     createError({
    //         statusCode: 400,
    //         statusMessage: 'Dados de material inválidos.'
    //     })
    // }
    //
    // const {name, formula, concentration, weight, brand, observation, metric} = body;
    // try {
    //     return await Material.create({
    //         name, formula, concentration, weight, brand, observation, metric
    //     });
    // } catch (err) {
    //     createError({
    //         statusCode: 500,
    //         statusMessage: 'Não foi possível adicionar este material'
    //     })
    // }
})
