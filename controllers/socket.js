import { sequelize } from "../db/index.js";
import models from "../models/index.js";
const { Message } = models;

export default function setupSocket(io) {
  const onlineUsers = {};
  const lastSeen = {};

  io.on("connection", (socket) => {
    //console.log(`User connected: ${socket.id}`);

    socket.on("user_connected", (user) => {
      if (!onlineUsers[user.id]) {
        onlineUsers[user.id] = new Set();
      }

      onlineUsers[user.id].add(socket.id);
      //console.log("Online users:", Object.keys(onlineUsers)); //comment logs

      delete lastSeen[user.id];

      io.emit("update_online_users", {
        userIds: Object.keys(onlineUsers),
        lastSeen: lastSeen,
      });
    });

    socket.on("send_message", async (data) => {
      const message = await Message.create({
        user_id: data.user_id,
        community_id: data.community_id,
        content: data.content,
      });

      const fullMessage = {
        ...message.dataValues,
        User: data.user,
      };

      io.emit("receive_message", fullMessage);
    });

    socket.on("user_typing", (data) => {
      socket.broadcast.emit("display_typing", {
        userId: data.user_id,
        communityId: data.community_id,
        username: data.username,
      });
    });

    socket.on("disconnect", () => {
      // console.log(`User disconnected: ${socket.id}`);  //comment logs
      for (const [userId, socketSet] of Object.entries(onlineUsers)) {
        socketSet.delete(socket.id);
        if (socketSet.size === 0) {
          delete onlineUsers[userId];
          lastSeen[userId] = new Date();
        }
      }

      io.emit("update_online_users", {
        userIds: Object.keys(onlineUsers),
        lastSeen: lastSeen,
      });
    });
  });
}
