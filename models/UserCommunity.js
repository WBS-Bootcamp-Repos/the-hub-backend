import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const UserCommunity = sequelize.define(
  "UserCommunity",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "communities",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member", // or "admin"
    },
  },
  {
    tableName: "user_communities",
    timestamps: true,
    underscored: true,
  }
);

export default UserCommunity;
