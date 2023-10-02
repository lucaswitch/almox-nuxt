import _sequelize from "sequelize";

const {Model, Sequelize} = _sequelize;

export default class User extends Model {
    static init(sequelize, DataTypes) {
        return sequelize.define(
            "User",
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                username: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                full_name: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                role: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    default: 0
                }
            },
            {
                tableName: "user",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{name: "id"}],
                    },
                ],
            }
        );
    }
}
