import React from "react";
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
  // Gruppér opgaver efter kategori og sortér efter prioritet indenfor hver gruppe
  const groupedTasks = tasks.reduce((groups: Record<string, Task[]>, task) => {
    if (!groups[task.category]) {
      groups[task.category] = [];
    }
    groups[task.category].push(task);
    // Sortér opgaverne i hver kategori efter prioritet (højere prioritet først)
    groups[task.category].sort((a, b) => b.priority - a.priority);
    return groups;
  }, {});

  // Filtrer opgaverne baseret på de valgte filtre
  const filteredTasks = Object.keys(groupedTasks).reduce(
    (result: Record<string, Task[]>, category) => {
      if (
        (filters.category && category !== filters.category) ||
        (filters.date &&
          !groupedTasks[category].some(
            (task) => task.chooseDate === filters.date
          ))
      ) {
        return result;
      }
      result[category] = groupedTasks[category];
      return result;
    },
    {}
  );

  return (
    <div>
      <h2>Dine Opgaver</h2>
      {/* Iterér over filtrerede og sorterede opgaver */}
      {Object.keys(filteredTasks).map((category) => (
        <div key={category} style={{ marginBottom: "16px" }}>
          {/* Kategoriens overskrift */}
          <Typography variant="h6" gutterBottom>
            {category}
          </Typography>
          {filteredTasks[category].map((task, index) => (
            <Accordion key={`${category}-${index}`} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
                onClick={(e) => e.stopPropagation()}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center"
                  }}>
                  <Checkbox
                    edge="start"
                    checked={checked[index]}
                    onChange={() => handleToggle(index)}
                    inputProps={{ "aria-label": "Task completed" }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Typography>
                    <strong>{task.taskName}</strong> (Prioritet: {task.priority}
                    )
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <div>
                  <div>
                    <strong>Kategori:</strong> {task.category}
                  </div>
                  <div>
                    <strong>Hvornår:</strong> {task.chooseDate}
                  </div>
                  <div>
                    <strong>Gentagelse:</strong> {task.repeatTask}
                  </div>
                  <div>
                    <strong>Påmindelse:</strong> {task.remind.join(", ")}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
