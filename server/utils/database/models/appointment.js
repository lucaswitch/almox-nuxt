import _sequelize from "sequelize";

const {Model} = _sequelize;

export default class Appointment extends Model {
    static init(sequelize, DataTypes) {
        return sequelize.define(
            "Appointment",
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                lab_id: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                scheduled_by: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                note: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                scheduled_from: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                scheduled_to: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                is_deleted: {
                    type: DataTypes.TINYINT,
                    allowNull: false,
                    defaultValue: 0
                }
            },
            {
                tableName: "appointment",
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
