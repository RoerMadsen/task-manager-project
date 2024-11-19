import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Task {
  taskName: string;
  category: string;
  chooseDate: string;
  repeatTask: string;
  remind: string[];
  priority: number;
  isChecked?: boolean; // Tilføj denne linje
}


interface TaskListProps {
  tasks: Task[];
  checked: boolean[];
  handleToggle: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, checked, handleToggle }) => {
  // Definerer kategorilisten fra NewTask
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

  // Gruppér opgaver efter kategori og sorter efter prioritet og status indenfor hver gruppe
  const groupedTasks = tasks.reduce((groups: Record<string, Task[]>, task, index) => {
    if (!groups[task.category]) {
      groups[task.category] = [];
    }
    groups[task.category].push({ ...task, isChecked: checked[index] });

    // Sortér opgaverne efter prioritet (højere prioritet først) og status (ikke-udført først)
    groups[task.category].sort((a, b) => {
      if (a.isChecked !== b.isChecked) {
        return a.isChecked ? 1 : -1; // Flytter udførte opgaver nederst
      }
      return b.priority - a.priority; // Sorterer efter prioritet
    });

    return groups;
  }, {});

  return (
    <div>
      <h2>Dine Opgaver</h2>
      {/* Iterér over kategorilisten for at vise hver kategori som en sektion */}
      {categories.map((category) => (
        <div key={category} style={{ marginBottom: "16px" }}>
          {/* Viser kun kategorier, der har opgaver */}
          {groupedTasks[category] && (
            <>
              {/* Kategoriens overskrift */}
              <Typography variant="h6" gutterBottom>
                {category}
              </Typography>
              {groupedTasks[category].map((task, index) => (
                <Accordion key={`${category}-${index}`} sx={{ mb: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${index}-content`}
                    id={`panel-${index}-header`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      {/* Checkbox til at markere opgaven som færdig */}
                      <Checkbox
                        edge="start"
                        checked={checked[index]}
                        onChange={() => handleToggle(index)}
                        inputProps={{ "aria-label": "Task completed" }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {/* Opgavens navn og prioritet vises som overskrift */}
                      <Typography>
                        <strong>{task.taskName}</strong> (Prioritet: {task.priority})
                      </Typography>
                    </Box>
                  </AccordionSummary>

                  {/* AccordionDetails viser ekstra information om opgaven */}
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
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
