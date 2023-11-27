import {StockEntry} from "~/server/utils/database/models";
import moment from 'moment'
import {EntrySchema} from "~/server/utils/validation";

export default defineEventHandler(async function (event) {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    const body = await readBody(event);

    const {amount, material_id} = body;
    try {
        await EntrySchema.validate({amount});
    } catch (err) {
        const errors = {}
        // @ts-ignore
        errors[err.path] = err.message;
        return createError({
            status: 400,
            statusText: 'Ocorreu um erro de validação.',
            data: errors
        })
    }
    const quantity = await getCurrentQuantity(material_id)
    const newQuantity = quantity + amount;
    if (newQuantity < 0) {
        return createError({
            status: 400,
            statusText: 'Quantidade em estoque insuficiente.',
            data: {amount: 'Quantidade em estoque insuficiente.'}
        })
    }


    const created_at = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    const updated_at = created_at;
    return await StockEntry.create({
        user_id: event.context.user.id,
        material_id,
        amount,
        created_at,
        updated_at
    })
})

async function getCurrentQuantity(material_id: number): Promise<number> {
    return await StockEntry.sum('amount', {
        where: {
            material_id
        }
    })
}
