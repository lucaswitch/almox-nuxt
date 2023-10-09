export default defineNitroPlugin(async function () {
    try {
        // ts-ignore
        await sequelize.authenticate();
        await sequelize.sync({force: true, alter: true})
    } catch (err) {
        console.error(err);
    }
});
