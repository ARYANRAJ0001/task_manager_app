import { useState } from "react";
import { addTask } from "../utils/api";

function TaskForm({ refresh }) {
  const [form, setForm] = useState({
    text: "",
    description: "",
    dueDate: "",
    priority: "medium",
    category: "general",
    tags: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = async () => {
    if (!form.text.trim()) return;

    setLoading(true);

    try {
      await addTask({
        text: form.text,
        description: form.description,
        dueDate: form.dueDate || null,
        priority: form.priority,
        category: form.category,
        tags: form.tags ? form.tags.split(",") : [],
        location: form.location
      });

      setForm({
        text: "",
        description: "",
        dueDate: "",
        priority: "medium",
        category: "general",
        tags: "",
        location: ""
      });

      refresh();
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input name="text" value={form.text} onChange={handleChange} placeholder="Title" />

      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />

      <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />

      <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" />

      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />

      <button onClick={handleAdd} disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
}

export default TaskForm;