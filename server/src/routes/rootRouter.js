import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import habitsRouter from "./api/v1/habitsRouter.js"
import cool from 'cool-ascii-faces'

const rootRouter = new express.Router();

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/habits", habitsRouter)
rootRouter.get('/cool', (req, res) => res.send(cool()))
rootRouter.use("/", clientRouter);


export default rootRouter;
