import { Server } from "http";
import socketio from "socket.io";
import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";
import { addUser, findConnectedUser, removeUser } from "@/server-utils/socket";
import {
  loadMessages,
  sendMessage,
  setMessageRead,
  setMessageToUnread,
} from "@/server-utils/chat";
import { getChats } from "@/controllers/chat/chat.controller";
import connectDB from "@/connectDB";
const handler = nc({ onError });
connectDB();
handler.use((req, res, next) => {
  const httpServer = Server(req, res);
  req.io = socketio(httpServer, {
    cors: {
      origin: "*",
    },
  });
  let io = socketio.Server(res.socket.server);
  io.on("connection", (socket) => {
    socket.on("join", async ({ userId }) => {
      const users = await addUser(userId, socket.id);
      await setMessageRead(userId);
      setInterval(() => {
        socket.emit("connectedUsers", {
          users: users.filter((u) => u.userId !== userId),
        });
      }, 10000);
    });
    socket.on("loadMessage", async ({ userId, messageWith }) => {
      const { chat, error } = await loadMessages(userId, messageWith);
      if (!error) {
        socket.emit("messagesLoaded", { chat });
      } else {
        socket.emit("noChatFound");
      }
    });
    socket.on("newMessage", async ({ userId, receiver, message }) => {
      const { newMessage, error } = await sendMessage(
        userId,
        receiver,
        message
      );
      const receiverSocket = await findConnectedUser(receiver);
      if (receiverSocket) {
        io.to(receiverSocket.socketId).emit("newMessageReceived", {
          newMessage,
        });
      } else {
        await setMessageToUnread(receiver);
      }
      if (!error) {
        socket.emit("messageSent", { newMessage });
      }
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });

  console.log(req.io);
  next(authMiddleware);
});
handler.get(getChats);
// handler
//   .use(authMiddleware, (req, res, next) => {
//     if (!res.socket.server.io) {
//       const io = new Server(res.socket.server);
//       res.socket.server.io = io;
//     } else {
//       console.log("socket is running");
//     }
//   })
//   .get(getChats);

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
