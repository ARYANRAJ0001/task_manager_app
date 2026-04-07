const Task = require("../models/task.js");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const {
      text,
      description,
      dueDate,
      priority,
      category,
      tags,
      location   // ✅ added
    } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Task title is required"
      });
    }

    if (priority && !["low", "medium", "high"].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Priority must be low, medium, or high"
      });
    }

    const newTask = await Task.create({
      text: text.trim(),
      description: description || "",
      dueDate: dueDate || null,
      priority: priority || "medium",
      category: category || "general",
      tags: Array.isArray(tags) ? tags : [],

      location: location || "",   // ✅ saved safely

      user: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Task creation failed",
      error: error.message
    });
  }
};
// GET SINGLE TASK
const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch task",
      error: error.message
    });
  }
};
// GET ALL TASKS
const getAllTasks = async (req, res) => {
  try {
    const { search, status, priority, category, sortBy } = req.query;

    let query = {
      user: req.user.id
    };

    // SEARCH by task text or description
    if (search && search.trim() !== "") {
      query.$or = [
        { text: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // FILTER by completed / pending
    if (status === "completed") {
      query.completed = true;
    } else if (status === "pending") {
      query.completed = false;
    }

    // FILTER by priority
    if (priority) {
      query.priority = priority;
    }

    // FILTER by category
    if (category) {
      query.category = category;
    }

    let tasks = await Task.find(query);

    // SORT by due date
    if (sortBy === "dueDate") {
      tasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }

    // SORT by priority
    else if (sortBy === "priority") {
      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
      };

      tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    // DEFAULT sort = newest first
    else {
      tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch tasks",
      error: error.message
    });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const {
      text,
      description,
      completed,
      dueDate,
      priority,
      category,
      tags
    } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    if (text !== undefined) {
      if (text.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Task title cannot be empty"
        });
      }
      task.text = text.trim();
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (completed !== undefined) {
      task.completed = completed;
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate || null;
    }

    if (priority !== undefined) {
      if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
          success: false,
          message: "Priority must be low, medium, or high"
        });
      }
      task.priority = priority;
    }

    if (category !== undefined) {
      task.category = category;
    }

    if (tags !== undefined) {
      task.tags = Array.isArray(tags) ? tags : [];
    }

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Task update failed",
      error: error.message
    });
  }
};

// TOGGLE COMPLETE / INCOMPLETE
const toggleTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    task.completed = !task.completed;
    await task.save();

    return res.status(200).json({
      success: true,
      message: task.completed ? "Task marked complete" : "Task marked incomplete",
      task
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not update task completion",
      error: error.message
    });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      task
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Task deletion failed",
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask
};