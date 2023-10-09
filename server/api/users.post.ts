import {User} from "~/server/utils/database/models";
import {UserSchema} from "~/server/utils/validation";

export default defineEventHandler(async (event: any) => {
    if (!event.context.user) {
        createError({
            statusCode: 403,
            message: 'Apenas usuários autenticados podem utilizar esta rota.'
        })
    } else if (event.context.user.role !== 0) {
        createError({
            statusCode: 403,
            message: 'Apenas usuários autenticados e admin podem utilizar esta rota.'
        })
    }

    const body = await readBody(event);
    const {
        full_name,
        username,
        password,
        type,
        id = null
    } = body;

    try {
        await UserSchema.validate(body);
    } catch (err) {
        const errors = {};
        // @ts-ignore
        errors[err.path] = err.message;
        return createError({
            statusCode: 400,
            message: 'O usuário já existe.',
            errors
        })
    }
    let user = null;
    if (id) {
        // Atualizar
        user = await User.findByPk(id);
        if (user) {
            await user.update({
                username, password, role: (type === 'Admin') ? 0 : 1, full_name, is_deleted: false
            });
        }
        return user;
    }

    user = await doesUserWithUsernameExists(username)
    if (!user) {
        user = await User.create({
            username, password, role: (type === 'Admin') ? 0 : 1, full_name, is_deleted: false
        });
        return user;
    }

    if (!user.is_deleted) {
        createError({
            statusCode: 400,
            message: 'O usuário já existe.',
            errors: {
                username: 'O usuário com este "username" já existe.'
            }
        })
    } else if (user.role === 0) {
        createError({
            statusCode: 400,
            message: 'O é admin.',
            errors: {
                username: 'Este usuário é admin e não pode ser editado exceto por ele mesmo.'
            }
        })
    }
})

/**
 * Verifica se o usuário com o username existe.
 * @param username
 */
async function doesUserWithUsernameExists(username: string) {
    return await User.findOne({where: {username}});
}




