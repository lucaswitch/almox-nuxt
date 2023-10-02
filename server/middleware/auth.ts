import jwt from "jsonwebtoken";
import {JWT_SIGNATURE} from "~/server/api/sign.post";
import {User} from "~/server/utils/database/models";

export default defineEventHandler(async (event) => {
    let authorization = event.req.headers?.authorization || '';
    if (typeof authorization === 'string') {
        authorization = authorization.replace("Bearer ", "");

        if (authorization) {
            try {
                const decoded = jwt.verify(authorization, JWT_SIGNATURE);
                if (decoded) {
                    event.context.user = await User.findByPk(decoded.sub);
                }
            } catch (err) {
                console.error(err);
                return createError({
                    statusCode: 400,
                    statusMessage: "Credênciais inválidas."
                })
            }
        }
    }
})

