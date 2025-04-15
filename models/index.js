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
import Comment from "./Comment.js";
import UserCommunity from "./UserCommunity.js";

// Associations
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

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

// User and Post association
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId", as: "author" });

// Post and Comment association
Post.hasMany(Comment, { foreignKey: "post_id", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

// User and Comment association
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id", as: "author" });

// User and Community association
User.belongsToMany(Community, {
  through: UserCommunity,
  foreignKey: "user_id",
  otherKey: "community_id",
});
Community.belongsToMany(User, {
  through: UserCommunity,
  foreignKey: "community_id",
  otherKey: "user_id",
});

// Post and Community association
Community.hasMany(Post, { foreignKey: "community_id" });
Post.belongsTo(Community, { foreignKey: "community_id" });

// Community and List association
Community.hasMany(List, { foreignKey: "community_id" });
List.belongsTo(Community, { foreignKey: "community_id" });

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
  Comment,
  UserCommunity,
};

Object.entries(models).forEach(([name, model]) => {
  if (!model) {
    console.warn(`Warning: Model ${name} was not loaded correctly.`);
  } else {
    console.log(`Model ${name} loaded successfully.`);
  }
});

export default models;
