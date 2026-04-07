import { deleteTask } from "../utils/api";

function TaskItem({ task, refresh }) {
  const handleDelete = async () => {
    await deleteTask(task._id);
    refresh();
  };

  // Function to get priority class and color
  const getPriorityClass = () => {
    switch (task.priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  // Function to get priority icon
  const getPriorityIcon = () => {
    switch (task.priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟠";
      case "low":
        return "🟢";
      default:
        return "🟠";
    }
  };

  return (
    <div className={`task-item ${getPriorityClass()}`}>
      <div className="task-header">
        <div className="task-title">
          <i className="fas fa-check-circle"></i>
          <span>{task.text}</span>
        </div>
        <div className={`priority-badge ${getPriorityClass()}`}>
          {getPriorityIcon()} {task.priority.toUpperCase()}
        </div>
      </div>

      {task.description && (
        <div className="task-desc">
          <i className="fas fa-align-left"></i> {task.description}
        </div>
      )}

      <div className="task-meta">
        {task.category && task.category !== "general" && (
          <span className="meta-category">
            <i className="fas fa-folder"></i> {task.category}
          </span>
        )}
        
        {task.dueDate && (
          <span className="meta-date">
            <i className="fas fa-calendar-alt"></i> Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        
        {task.location && (
          <span className="meta-location">
            <i className="fas fa-map-marker-alt"></i> {task.location}
          </span>
        )}
        
        {Array.isArray(task.tags) && task.tags.length > 0 && (
          <span className="meta-tags">
            <i className="fas fa-tags"></i> {task.tags.join(", ")}
          </span>
        )}
      </div>

      <button onClick={handleDelete} className="delete-btn">
        <i className="fas fa-trash-alt"></i> Delete Task
      </button>
    </div>
  );
}

export default TaskItem;