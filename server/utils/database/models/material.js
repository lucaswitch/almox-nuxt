import _sequelize from "sequelize";

const { Model, Sequelize } = _sequelize;

export default class Material extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Material",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        formula: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        concentration: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        weight: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        brand: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        observation: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        metric: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        created_at: {
          type: DataTypes.STRING,
          allowNull: null,
        },
        updated_at: {
          type: DataTypes.STRING,
          allowNull: null,
        },
      },
      {
        tableName: "material",
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
