const todo = require("../model/to-do");

exports.createTodo = async function (req, res) {
  const { title, description } = req.body;
  todo.create(
    {
      title,
      description
    },
    (err, newTodo) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        return res
          .status(201)
          .json({ message: "new to-do task created", newTodo });
      }
    }
  );
};

//PUT request
exports.updateTodoById = async (req, res) => {
  todo.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description
    },
    (err, Todo) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!Todo) {
        return res.status(404).json({ message: "id not found" });
      } else {
        Todo.save((err, savedTodo) => {
          if (err) {
            return res.status(400).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "to-do task is updated successfully" });
          }
        });
      }
    }
  );
};

//DELETE request /todo/:id
exports.deleteTodoById = async (req, res) => {
  todo.findOneAndDelete(req.params.id, (err, Todo) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!Todo) {
      return res.status(404).json({ message: "This to-do task was not found" });
    } else {
      return res.status(200).json({ message: "This to-do task is deleted successfully" });
    }
  });
};

//GET reqest to /todo list fetch all student
exports.getTodo = async (req, res) => {
  todo.find({}, (err, Todo) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json({ Todo });
    }
  });
};