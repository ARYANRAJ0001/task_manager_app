import TaskItem from "./TaskItem";

function TaskList({ tasks, refresh }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-tasks">
        <i className="fas fa-clipboard-list"></i>
        <p>No tasks yet. Create your first task above! ✨</p>
      </div>
    );
  }

  return (
    <div className="tasklist-container">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} refresh={refresh} />
      ))}
    </div>
  );
}

export default TaskList;