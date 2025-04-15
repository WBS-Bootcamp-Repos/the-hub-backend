import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Community = sequelize.define(
  "Community",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    settings: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        calendar: true,
        lists: true,
        posts: true,
        events: true,
        messages: true,
      },
    },
    pin_board: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    tableName: "communities",
    timestamps: true,
    underscored: true,
    updatedAt: false,
  }
);

export default Community;
