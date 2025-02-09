import express, { Request, Response } from "express";
import { authorize } from "../middleware/authMiddleware";
import chatService from "../services/chat.service";

const router = express.Router();

router.get("/", authorize, async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const chats = await chatService.getChats(userId);
  res.json(chats);
});

export default router;
