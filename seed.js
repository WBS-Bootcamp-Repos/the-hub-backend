import { sequelize } from "./db/index.js";
import models from "./models/index.js";

const {
  User,
  Post,
  Community,
  Message,
  Event,
  List,
  ListItem,
  EventAttendee,
  MessageReaction,
} = models;

const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced!");

    // Communities
    const communities = await Community.bulkCreate([
      { name: "Tech Enthusiasts" },
      { name: "Nature Lovers" },
    ]);

    // Users
    const users = await User.bulkCreate(
      [
        {
          username: "Alice",
          password: "pass1234",
          email: "alice@example.com",
          community_id: communities[0].id,
        },
        {
          username: "Bob",
          password: "pass1234",
          email: "bob@example.com",
          community_id: communities[0].id,
        },
        {
          username: "Carol",
          password: "pass1234",
          email: "carol@example.com",
          community_id: communities[1].id,
        },
      ],
      { individualHooks: true }
    );

    // Posts
    await Post.bulkCreate([
      { title: "Hello World", content: "First post!", user_id: users[0].id },
      {
        title: "Nature is beautiful",
        content: "Trees and lakes.",
        user_id: users[2].id,
      },
    ]);

    // Events
    const events = await Event.bulkCreate([
      {
        title: "Hackathon 2025",
        date: new Date("2025-05-10"),
        start_time: new Date("2025-05-10T09:00:00Z"),
        end_time: new Date("2025-05-10T18:00:00Z"),
        description: "A full-day coding event to build cool stuff.",
        location: "Tech Hub Berlin",
        type: "Tech",
        user_id: users[0].id,
      },
      {
        title: "Nature Walk",
        date: new Date("2025-06-15"),
        start_time: new Date("2025-06-15T08:30:00Z"),
        end_time: new Date("2025-06-15T12:00:00Z"),
        description: "A peaceful morning hike through the forest.",
        location: "Black Forest Trailhead",
        type: "Outdoor",
        user_id: users[2].id,
      },
    ]);

    // Event Attendees
    await EventAttendee.bulkCreate([
      { user_id: users[0].id, event_id: events[0].id },
      { user_id: users[1].id, event_id: events[0].id },
      { user_id: users[2].id, event_id: events[1].id },
    ]);

    // Messages
    const messages = await Message.bulkCreate([
      { content: "Welcome to the group!", user_id: users[0].id },
      { content: "Excited to be here!", user_id: users[1].id },
    ]);

    // Lists
    const lists = await List.bulkCreate([
      {
        title: "Groceries",
        category: "Shopping",
        privacy: "Private",
        user_id: users[0].id,
      },
      {
        title: "Travel Checklist",
        category: "Travel",
        privacy: "Community",
        user_id: users[1].id,
      },
    ]);

    // List Items
    await ListItem.bulkCreate([
      {
        name: "Red Apples (2kg)",
        list_id: lists[0].id,
        is_completed: false,
      },
      {
        name: "Whole Wheat Bread",
        list_id: lists[0].id,
        is_completed: false,
      },
      {
        name: "Valid Passport for Travel",
        list_id: lists[1].id,
        is_completed: false,
      },
    ]);

    console.log("🌱 Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await sequelize.close();
  }
};

seed();
