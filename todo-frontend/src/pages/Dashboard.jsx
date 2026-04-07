import { useEffect, useState } from "react";
import { getTasks } from "../utils/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks || []);
    } catch (err) {
      console.log("Fetch tasks error:", err.response?.data);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h2>Task Manager</h2>
      <div className="dashboard-grid">
        <div className="form-card">
          <TaskForm refresh={loadTasks} />
        </div>
        <div className="tasks-card">
          <TaskList tasks={tasks} refresh={loadTasks} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;