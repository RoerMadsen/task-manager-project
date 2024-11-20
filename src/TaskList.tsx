import React from "react";

import { Button } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


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
 
  // Function to clear all tasks
  const handleClearAllTasks = () => {
    // Assuming tasks are managed via a state function (e.g., setTasks)
    setTasks([]);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearAllTasks}
        style={{ marginBottom: "1rem" }}
      >
        Slet alle opgaver
      </Button>
      {/* Resten af din eksisterende rendering-logik */}
      {tasks.map((task, index) => (
        <Accordion key={task.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Checkbox
              checked={checked[index]}
              onChange={() => handleToggle(index)}
            />
            <Typography>{task.taskName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {/* Task detaljer */}
              <Typography>Kategori: {task.category}</Typography>
              <Typography>Prioritet: {task.priority}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

      ))}
    </div>
  );
};

export default TaskList;
