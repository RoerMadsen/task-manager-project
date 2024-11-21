import React from "react";

import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Importer skraldespandsikonet
import TaskItem from "./TaskItem"; // Sørg for at importere TaskItem korrekt

import { Task } from "./types"; // Sørg for at importere Task korrekt

interface TaskListProps {
  tasks: Task[];
  checked: boolean[];
  handleToggle: (taskId: number) => void;
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
    "Andet"
  ];

  // Gruppér opgaver efter kategori
  const groupedTasks = tasks.reduce(
    (groups: Record<string, Task[]>, task, index) => {
      if (!groups[task.category]) {
        groups[task.category] = [];
      }
      groups[task.category].push(task); // Her gemmer vi nu task med isChecked direkte på tasken
      return groups;
    },
    {}
  );

  // Funktion til at sortere opgaver, så de afkrydsede kommer nederst
  const sortTasksByChecked = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
      // Hvis a er afkrydset og b ikke er, ryk a til bunden
      if (a.isChecked && !b.isChecked) return 1; // Ryk a til bunden, hvis a er afkrydset
      if (!a.isChecked && b.isChecked) return -1; // Ryk b til toppen, hvis b er afkrydset
      return 0; // Hvis begge er enten afkrydsede eller ikke, forbliver rækkefølgen uændret
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px"
        }}>
        <h2>Dine Opgaver</h2>

        {/* Skraldespandsikon til at slette alle opgaver */}
        <IconButton
          color="secondary"
          onClick={handleDeleteAll}
          aria-label="Slet alle opgaver">
          <DeleteIcon />
        </IconButton>
      </div>

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

              {/* Vis opgaverne for hver kategori, sorter før visning */}
              {sortTasksByChecked(groupedTasks[category]).map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={checked[index]} // Sørg for at bruge den synkroniseret "checked" status
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
