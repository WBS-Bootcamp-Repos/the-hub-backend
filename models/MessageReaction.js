import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const MessageReaction = sequelize.define(
  "MessageReaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "messages",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    reaction_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "message_reactions",
    timestamps: true,
    updatedAt: false,
    underscored: true,
  }
);

export default MessageReaction;
