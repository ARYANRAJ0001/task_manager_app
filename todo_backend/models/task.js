const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Task title is required"],
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: {
      type: Date,
      default: null
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    category: {
      type: String,
      default: "general",
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);