import express from "express";
import {
  getChats,
  getChat,
  addChat,
  readChat,
  findChatBetweenUsers,
} from "../controller/chat.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);
router.get("/find/:userId1/:userId2", verifyToken, findChatBetweenUsers);

export default router;
