import express from "express";

const router = express.Router();

router.get("/", (_res, res) => {
  res.send("pong");
});

export default router;
