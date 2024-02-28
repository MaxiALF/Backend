import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/register", (req, res, next) =>{
  try {
      return res.render("register")
  } catch (error) {
      next(error)
  }
})

usersRouter.get("/chat", (req, res, next) =>{
  try {
    return res.render("chat", {})
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/login", async(req,res,next)=>{
  try {
    return res.render("login") 
  } catch (error) {
    return next(error) 
  }
})

export default usersRouter;