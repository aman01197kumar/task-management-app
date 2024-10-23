import Task from "../model/getTask.js";

export const taskController = {
  // Get all tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (err) {
      console.error(err);
      res.status(200).json({ message: "Server error" });
    }
  },

  // Get a single task by ID
  getTaskById: async (req, res) => {
    const { id } = req.params;

    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(task);
    } catch (err) {
      console.error(err);
      res.status(200).json({ message: "Server error" });
    }
  },

  // Create a new task
  createTask: async (req, res) => {
    const { task_name } = req.body;
    try {
      const newTask = new Task({ task_name });
      await newTask.save();
      res.status(200).json(newTask);
    } catch (err) {
      console.error(err);
      res.status(200).json({ message: "Server error" });
    }
  },

  // Update a task by ID
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { task_name } = req.body; // Change 'text' to 'task_name'

    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { task_name }, // Update with task_name
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json(updatedTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" }); // Change to 500 for server errors
    }
  },

  // Delete a task by ID
  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(200).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(200).json({ message: "Server error" });
    }
  },

  removeAll: async (req, res) => {
    try {
      await Task.deleteMany({});
      res
        .status(200)
        .json({ message: "All collections cleared successfully." });
    } catch (err) {
      console.error(err);
      res.status(200).json({ message: "Server Error" });
    }
  },
};
