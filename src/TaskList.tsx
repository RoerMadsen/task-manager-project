import React from "react";

import { Button, Typography, Box } from "@mui/material";
import TaskItem from "./TaskItem";  // Sørg for at importere TaskItem korrekt
import { Task } from "./types"; // Sørg for at importere Task korrekt

interface TaskListProps {
  tasks: Task[];
  checked: boolean[];
  handleToggle: (index: number) => void;
  handleDeleteAll: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  checked,
  handleToggle,
  handleDeleteAll,
  onUpdateTask,
  onDeleteTask
}) => {
  // Definerer kategorilisten
  const categories = [
    "Børn",
    "Rengøring",
    "Havearbejde",
    "Madlavning",
    "Indkøb",
    "Reperationer",
    "Transport",
    "Kæledyr",
    "Aftaler",
    "Motion",
    "Selvforkælelse",
    "Andet",
  ];

  // Gruppér opgaver efter kategori
  const groupedTasks = tasks.reduce((groups: Record<string, Task[]>, task, index) => {
    if (!groups[task.category]) {
      groups[task.category] = [];
    }
    groups[task.category].push({ ...task, isChecked: checked[index] });
    return groups;
  }, {});

  return (
    <div>
      <h2>Dine Opgaver</h2>


      {/* Knap til at slette alle opgaver */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteAll}
        sx={{ mb: 2 }}
      >
        Slet Alle Opgaver
      </Button>

      {/* Iterér over kategorilisten for at vise hver kategori som en sektion */}
      {categories.map((category) => (
        <div key={category} style={{ marginBottom: "16px" }}>
          {/* Viser kun kategorier, der har opgaver */}
          {groupedTasks[category] && groupedTasks[category].length > 0 && (

            <>
              {/* Kategoriens overskrift */}
              <Typography variant="h6" gutterBottom>
                {category}
              </Typography>

              {/* Vis opgaverne for hver kategori */}
              {groupedTasks[category].map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={checked[index]}
                  onToggle={() => handleToggle(index)}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask} // Passér sletningsfunktionen
                />
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
