import _sequelize from "sequelize";

const { Model, Sequelize } = _sequelize;

export default class StockEntry extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "StockEntry",
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
        user_id: {
          allowNull: false,
          type: DataTypes.BIGINT,
        },
        withdrawn_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        received_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
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
        tableName: "stock_entry",
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
