import {StockEntry} from "~/server/utils/database/models";
import moment from 'moment'

export default defineEventHandler(async function (event) {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }
    const body = await readBody(event);

    const {amount, material_id} = body;

    const created_at = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    const updated_at = created_at;
    return await StockEntry.create({
        user_id: 1,
        material_id,
        amount,
        created_at,
        updated_at
    })
})
