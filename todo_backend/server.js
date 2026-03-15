const express = require("express");
const cors = require("cors");
const bcrypt=require("bcrypt.js");
const jwt=requie("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let users=[];
const bcrypt = require("bcrypt");

app.post("/signup", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "credentials not found"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = {
        name: name,
        email: email,
        password: hashedPassword
    };

    users.push(newuser);

    res.status(201).json({
        message: "user created successfully"
    });

});
app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400).json({
            message:"credential not found"
        })
    }
    
   const pass=bcrypt.compare(password,req.body.password);
   if(pass){

   }
})
app.get("/", (req, res) => {
  res.send("Todo backend is running");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { text, dueDate, priority, category } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Task text is required" });
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false,
    dueDate: dueDate || "",
    priority: priority || "medium",
    category: category || "general"
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task created successfully",
    task: newTask
  });
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { text, dueDate, priority, category } = req.body;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Task text is required" });
  }

  task.text = text;
  task.dueDate = dueDate || "";
  task.priority = priority || "medium";
  task.category = category || "general";

  res.json({
    message: "Task updated successfully",
    task: task
  });
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { completed } = req.body;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = completed;

  res.json({
    message: "Task status updated successfully",
    task: task
  });
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});