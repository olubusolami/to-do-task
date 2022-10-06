const express = require("express")
const router = express.Router();
const todoController = require("../controllers/to-do")

//add todo list
router.post("/add", todoController.createTodo)

//update todo list
router.put("/:id", todoController.updateTodoById)

//delete todo list
router.delete("/delete/:id", todoController.deleteTodoById)

//get all todo list
router.get("/get", todoController.getTodo)

module.exports = router;