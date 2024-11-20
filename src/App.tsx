import React, { useState, useEffect } from "react";
import NewTask from "./NewTask";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";

interface Task {
  id: number;
  taskName: string;
  category: string;
  priority: string;
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

  // State til at håndtere dialogboksen for redigering
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Når tasks ændres, gemmes de i localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Funktion til at tilføje en ny opgave til listen
  const addNewTask = (
    id: number,
    taskName: string,
    category: string,
    priority: string,
    chooseDate: string,
    repeatTask: string,
    remind: string[]
  ) => {
    const newTask: Task = {
      id,
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
    updatedChecked[index] = !updatedChecked[index];
    setChecked(updatedChecked);
  };

  // Funktion til at åbne dialogboksen og initialisere den med opgavens data
  const handleOpenDialog = (task: Task) => {
    setCurrentTask(task);
    setIsDialogOpen(true);
  };

  // Funktion til at lukke dialogboksen
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentTask(null);
  };

  // Funktion til at håndtere ændringer i redigeringsformularen
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTask) {
      const { name, value } = e.target;
      setCurrentTask({ ...currentTask, [name]: value });
    }
  };

  // Funktion til at opdatere opgaven
  const handleUpdateTask = () => {
    if (currentTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTask.id ? currentTask : task
        )
      );
      handleCloseDialog();
    }
  };

  // Funktion til at slette alle opgaver
  
  const handleClearAllTasks = () => {
    setTasks([]);

  };

  return (
    <div className="grid-container">
      <div className="grid-item header">
        <h1>The Mental Load</h1>
        <IconButton onClick={handleDeleteAll} color="error">
          <DeleteIcon />
        </IconButton>
      </div>


      {/* Knap til at slette alle opgaver */}
      <div className="grid-item">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearAllTasks}
          style={{ marginBottom: "1rem" }}
        >
          Slet alle opgaver
        </Button>
      </div>

      {/* Opgaveliste */}
      <div className="grid-item">
        <h2>Dine Opgaver</h2>
        {tasks.map((task, index) => (
          <Accordion key={task.id} sx={{ mb: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${task.id}-content`}
              id={`panel-${task.id}-header`}
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%"
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
                <Typography sx={{ flexGrow: 1 }}>
                  <strong>{task.taskName}</strong>
                </Typography>
                {/* Settings-ikon */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDialog(task);
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div>
                  <strong>Kategori:</strong> {task.category}
                </div>
                <div>
                  <strong>Prioritet:</strong> {task.priority}
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

      {/* Tilføj ny opgave */}
      <div className="grid-item">
        <h2>Tilføj Ny Opgave</h2>
        <NewTask addNewTask={addNewTask} />
      </div>

      {/* Dialog til redigering */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Rediger Opgave</DialogTitle>
        <DialogContent>
          {currentTask && (
            <>
              <TextField
                label="Opgavenavn"
                name="taskName"
                value={currentTask.taskName}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Kategori"
                name="category"
                value={currentTask.category}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Prioritet"
                name="priority"
                value={currentTask.priority}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Hvornår"
                name="chooseDate"
                value={currentTask.chooseDate}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Gentagelse"
                name="repeatTask"
                value={currentTask.repeatTask}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Påmindelse"
                name="remind"
                value={currentTask.remind.join(", ")}
                onChange={(e) =>
                  setCurrentTask((prev) =>
                    prev
                      ? {
                          ...prev,
                          remind: e.target.value.split(",").map((s) => s.trim())
                        }
                      : null
                  )
                }
                fullWidth
                margin="dense"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuller</Button>
          <Button onClick={handleUpdateTask} variant="contained">
            Opdater Opgave
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
