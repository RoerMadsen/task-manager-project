import React from "react";
import TaskItem from "./TaskItem";

//Shabana - Hele Filen

interface TaskListProps {
  taskItems: {
    id: number;
    name: string;
    priority: string;
    completed: boolean;
    task: string;
  }[];
  removeTaskItem: (id: number) => void;
  toggleTaskItemCompletion: (id: number) => void;
}

const departmentOrder: { [key: string]: number } = {
  "frugt/grønt": 1,
  brød: 2,
  kød: 3,
  mejeri: 4,
  konserves: 5,
  frost: 6,
  nonfood: 7
};

const TaskList: React.FC<TaskListProps> = ({
  taskItems,
  removeTaskItem,
  toggleTaskItemCompletion
}) => {
  const sortedTaskItems = taskItems.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return departmentOrder[a.priority] - departmentOrder[b.priority];
  });

  const groupedTaskItems = sortedTaskItems.reduce((acc, taskItem) => {
    if (!acc[taskItem.task]) {
      acc[taskItem.task] = [];
    }
    acc[taskItem.task].push(taskItem);
    return acc;
  }, {} as { [key: string]: (typeof taskItems)[0][] });

  return (
    <div>
      {Object.keys(groupedTaskItems).map((task) => (
        <div key={task}>
          <h2>{task}</h2>
          <ul>
            {groupedTaskItems[task].map((taskItem) => (
              <TaskItem
                key={taskItem.id}
                taskItem={taskItem}
                removeTaskItem={removeTaskItem}
                toggleTaskItemCompletion={toggleTaskItemCompletion}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
