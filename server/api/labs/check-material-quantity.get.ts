import {StockEntry} from "~/server/utils/database/models";

export default defineEventHandler(async function (event) {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }

    let {material_id, quantity} = getQuery<{ material_id: string | number, quantity: string | number }>(event);
    if (typeof material_id !== 'number') {
        material_id = parseInt(material_id, 10)
    }
    if (typeof quantity !== 'number') {
        quantity = parseInt(quantity, 10)
    }
    const currentQuantity = await getCurrentQuantity(material_id)
    const newQuantity = currentQuantity - quantity
    return newQuantity > -1
})

async function getCurrentQuantity(material_id: number): Promise<number> {
    return (await StockEntry.sum('amount', {
        where: {
            material_id
        }
    }))
}
