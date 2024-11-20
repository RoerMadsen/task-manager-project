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

interface Task {
  id: number;
  taskName: string;
  category: string;
  chooseDate: string;
  repeatTask: string;
  remind: string[];
  priority: number;
}

interface TaskListProps {
  tasks: Task[];
  checked: boolean[];
  handleToggle: (index: number) => void;
  filters: { category: string; date: string }; // Tilføjet filterprop
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  checked,
  handleToggle,
  filters
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
