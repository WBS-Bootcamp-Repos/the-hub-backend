import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const List = sequelize.define(
  "List",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    privacy: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "lists",
    timestamps: true,
    underscored: true,
  }
);

export default List;
