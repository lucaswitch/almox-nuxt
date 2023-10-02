import {User} from "~/server/utils/database/models";
import jwt from "jsonwebtoken";

export const JWT_SIGNATURE =
    "askljdklsajdoklçasjdklsajdklasjdsajdklasj2o13iu9i12u3218738912%";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const credentials = await getCredentialsOrNull(body);
    try {
        if (!credentials) {
            throw new Error("Não foi possível confirmar a identidade deste login.");
        }
        return credentials;
    } catch (err) {
        return createError({
            statusCode: 400,
            statusMessage: "Ocorreu um erro inesperado.",
        })
    }
})


/**
 * Obtém usuários pela credêncial.
 * @param username
 * @param password
 */
async function getCredentialsOrNull({username = '', password = ''}): Promise<Credentials | null> {
    const user = await User.findOne({
        where: {
            username,
            password,
        },
    });
    if (user) {
        return {
            user,
            token: jwt.sign({sub: user.id, name: user.full_name}, JWT_SIGNATURE)
        };
    }
    return null;
}

export type Credentials = {
    user: typeof User | null,
    token: string | null
}
