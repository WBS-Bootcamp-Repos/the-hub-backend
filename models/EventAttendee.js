import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const EventAttendee = sequelize.define(
  "EventAttendee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events",
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
  },
  {
    tableName: "event_attendees",
    timestamps: true,
    updatedAt: false,
    underscored: true,
  }
);

export default EventAttendee;
