import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res, next) =>{
  try {
      return res.render("register")
  } catch (error) {
      next(error)
  }
})

export default usersRouter;