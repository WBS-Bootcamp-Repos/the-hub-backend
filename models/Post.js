import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image_url",
    },
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "communities",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "posts",
    timestamps: true,
    underscored: true,
  }
);

export default Post;
