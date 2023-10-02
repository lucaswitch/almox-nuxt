import _sequelize from "sequelize";

const { Model, Sequelize } = _sequelize;

export default class Stock extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Stock",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        material_id: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        tableName: "stock",
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
