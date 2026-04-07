const express = require("express");

const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask
} = require("../controllers/taskcontroller.js");

const authMiddleware = require("../middleware/authmiddleware.js");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getSingleTask);
router.put("/:id", updateTask);
router.patch("/:id/toggle", toggleTaskCompletion);
router.delete("/:id", deleteTask);

module.exports = router;