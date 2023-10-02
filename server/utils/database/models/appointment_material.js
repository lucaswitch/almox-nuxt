import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class AppointmentMaterial extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "AppointmentMaterial",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        material_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        appointment_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: "appointment_material",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
