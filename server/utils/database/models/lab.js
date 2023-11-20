import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class Lab extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Lab",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        student_capacity: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: "lab",
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
