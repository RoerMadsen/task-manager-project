import React, { useState, useEffect } from "react";
import NewTask from "./components/NewTask";
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
  taskName: string;
  category: string;
  chooseDate: string;
  repeatTask: string;
  remind: string[];
}

const App = () => {
  // Hent opgaver fra localStorage, hvis der er nogen gemt
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // State til at holde styr på, hvilke opgaver der er "checked"
  const [checked, setChecked] = useState<boolean[]>(
    new Array(tasks.length).fill(false)
  );

  // Når tasks ændres, gemmes de i localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Funktion til at tilføje en ny opgave til listen
  const addNewTask = (
    taskName: string,
    category: string,
    priority: string,
    chooseDate: string,
    repeatTask: string,
    remind: string[]
  ) => {
    const newTask = {
      taskName,
      category,
      priority,
      chooseDate,
      repeatTask,
      remind
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Funktion til at opdatere status for en checkbox (hvilken opgave der er færdig)
  const handleToggle = (index: number) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = !updatedChecked[index]; // Skift status for den valgte opgave
    setChecked(updatedChecked);
  };

  return (
    <div className="grid-container">
      <div className="grid-item header">
        <h1>The Mental Load</h1>
      </div>
      <div className="grid-item">
        <h2>Dine Opgaver</h2>
        {/* Render alle opgaver i en Accordion */}
        {tasks.map((task, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            {/* AccordionSummary bruges til at vise overskriften på opgaven og kan klikkes for at åbne/holde den lukket */}
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
                {/* Checkbox til at markere opgaven som færdig */}
                <Checkbox
                  edge="start"
                  checked={checked[index]}
                  onChange={() => handleToggle(index)} // Skift status når checkboxen trykkes
                  inputProps={{ "aria-label": "Task completed" }}
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Opgavens navn vises som overskrift */}
                <Typography>
                  <strong>{task.taskName}</strong>
                </Typography>
              </Box>
            </AccordionSummary>

            {/* AccordionDetails viser den ekstra information om opgaven, når den er udvidet */}
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

      <div className="grid-item">
        <h2>Tilføj Ny Opgave</h2>
        {/* Komponent til at tilføje en ny opgave */}
        <NewTask addNewTask={addNewTask} />
      </div>
    </div>
  );
};

export default App;
