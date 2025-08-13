const { default: mongoose } = require("mongoose");
const TASK = require("../models/task");

const createTask = async (req, res) => {
  const { title, description, tags } = req.body;

  if (!title || !description || !tags) {
    return res
      .status(400)
      .json({ message: "Provide title, description and tags to proceed" });
  }

  try {
    const task = await TASK.create(req.body);
    return res
      .status(201)
      .json({ success: true, task, message: "Task created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TASK.find().sort("-createdAt");
    res.status(200).json({ success: true, num: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Task ID" });
    }

    const task = await TASK.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await TASK.findByIdAndUpdate(taskId, req.body, {
      runValidators: true,
      new: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    return res.status(200).json({
      success: true,
      task,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await TASK.findByIdAndDelete(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
