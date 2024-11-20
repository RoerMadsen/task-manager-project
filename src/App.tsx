import React, { useState, useEffect } from "react";
import NewTask from "./NewTask";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Task } from "./types";
import TaskList from "./TaskList";

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
    remind: string
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
  const handleDeleteAll = () => {
    setTasks([]); // Sletter alle opgaver
    localStorage.setItem("tasks", JSON.stringify([])); // Opdaterer localStorage
  };

  return (
    <div className="grid-container">
      <div className="grid-item header">
        <h1>The Mental Load</h1>
        <IconButton onClick={handleDeleteAll} color="error">
          <DeleteIcon />
        </IconButton>
      </div>

      <div className=" grid-item">
        <h2>TaskList</h2>
        <TaskList
          tasks={tasks}
          checked={checked}
          handleToggle={handleToggle}
          handleDeleteAll={function (): void {
            throw new Error("Function not implemented.");
          }}
          onUpdateTask={function (updatedTask: Task): void {
            throw new Error("Function not implemented.");
          }}
          onDeleteTask={function (taskId: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>

      <div className="grid-item">
        <h2>Tilføj Ny Opgave</h2>
        <NewTask addNewTask={addNewTask} />
      </div>

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
                value={currentTask.remind}
                onChange={handleRe}
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
