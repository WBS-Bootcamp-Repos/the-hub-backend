import { sequelize } from "../db/index.js";

import User from "./User.js";
import Post from "./Post.js";
import Community from "./Community.js";
import Message from "./Message.js";
import Event from "./Event.js";
import List from "./List.js";
import ListItem from "./ListItem.js";
import EventAttendee from "./EventAttendee.js";
import MessageReaction from "./MessageReaction.js";

// Associations
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

User.belongsTo(Community, { foreignKey: "community_id" });
Community.hasMany(User, { foreignKey: "community_id" });

User.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Event, { foreignKey: "user_id" });
Event.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(List, { foreignKey: "user_id" });
List.belongsTo(User, { foreignKey: "user_id" });

List.hasMany(ListItem, { foreignKey: "list_id" });
ListItem.belongsTo(List, { foreignKey: "list_id" });

User.belongsToMany(Event, {
  through: EventAttendee,
  foreignKey: "user_id",
  otherKey: "event_id",
});
Event.belongsToMany(User, {
  through: EventAttendee,
  foreignKey: "event_id",
  otherKey: "user_id",
});

User.hasMany(MessageReaction, { foreignKey: "user_id" });
MessageReaction.belongsTo(User, { foreignKey: "user_id" });

Message.hasMany(MessageReaction, { foreignKey: "message_id" });
MessageReaction.belongsTo(Message, { foreignKey: "message_id" });

const models = {
  User,
  Post,
  Community,
  Message,
  Event,
  List,
  ListItem,
  EventAttendee,
  MessageReaction,
};

Object.entries(models).forEach(([name, model]) => {
  if (!model) {
    console.warn(`Warning: Model ${name} was not loaded correctly.`);
  } else {
    console.log(`Model ${name} loaded successfully.`);
  }
});

export default models;
