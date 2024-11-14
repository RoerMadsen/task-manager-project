import React from "react";
import "./style.scss";

//Shabana & Amanda
interface TaskItemProps {
  taskItem: {
    id: number;
    name: string;
    priority: string;
    completed: boolean;
  };
  removeTaskItem: (id: number) => void;
  toggleTaskItemCompletion: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  taskItem,
  removeTaskItem,
  toggleTaskItemCompletion
}) => {
  const handleCompleteClick = (id: number) => {
    if (!taskItem.completed) {
      toggleTaskItemCompletion(id);
    }
  };

  const handleDeleteClick = (id: number) => {
    const confirmed = window.confirm(
      "Er du sikker på at du vil slette opgaven?"
    );
    if (confirmed) {
      removeTaskItem(id);
    }
  };

  return (
    <li className={`task-item ${taskItem.completed ? "completed" : ""}`}>
      <span>{taskItem.name}</span>
      <span className={`priority-${taskItem.priority}`}>
        {" "}
        - Afdeling: {taskItem.priority}
      </span>
      <button
        onClick={() => handleCompleteClick(taskItem.id)}
        className={`complete ${taskItem.completed ? "active" : ""}`}>
        {taskItem.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => handleDeleteClick(taskItem.id)} className="delete">
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
