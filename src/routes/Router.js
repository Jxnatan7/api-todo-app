const express = require("express")
const  UserController = require("../controllers/UserController")
const TodoController = require("../controllers/TodoController")

const apiRouter = express.Router()

apiRouter.get("/home", UserController.home)
apiRouter.get("/users", UserController.getAllUsers)
apiRouter.post("/createUser", UserController.createUser)
apiRouter.post("/createTodo/:user_id", TodoController.createTodo)
apiRouter.get("/userTodo/:user_id", TodoController.getUserTodo)
apiRouter.patch("/updateTodo/:user_id/:todo_id", TodoController.updateTodo)
apiRouter.delete("/deleteTodo/:user_id/:todo_id", TodoController.deleteTodo)

module.exports = apiRouter