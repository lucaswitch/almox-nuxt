import {User} from "~/server/utils/database/models";
import {as} from "~/.output/public/_nuxt/entry.b6850ddb";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            statusMessage: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    }

    const {limit = null, offset = null, id = null} = getQuery(event)
    if (id) {
        return await getUser(id);
    }
    return await getUsers({limit, offset})
})

/**
 * Encontra usuário pelo id.
 * @param id
 */
async function getUser(id: number) {
    return await User.findOne({
        attributes: [
            'id', 'username', 'full_name', 'role'
        ],
        where: {
            id,
            is_deleted: false
        }
    });
}

/**
 * Obtém os materiais.
 * @param limit
 * @param offset
 */
async function getUsers({limit = 1000, offset = 0}) {
    return await User.findAll({
        limit, offset, attributes: [
            'id', 'username', 'full_name', 'role'
        ],
        where: {
            is_deleted: false
        }
    });
}
