import React, { useState, useEffect } from "react";
import NewTask from "./NewTask";

import TaskList from "./TaskList";
import { Task } from "./types";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskIdCounter, setTaskIdCounter] = useState<number>(1);
  const [checked, setChecked] = useState<boolean[]>([]); // State for afkrydsningsbokse


  // Hent taskIdCounter fra localStorage (hvis eksisterende)
  useEffect(() => {
    const storedId = localStorage.getItem("taskIdCounter");
    if (storedId) {
      setTaskIdCounter(parseInt(storedId, 10));
    }
  }, []);

  // Gem taskIdCounter i localStorage
  useEffect(() => {
    localStorage.setItem("taskIdCounter", taskIdCounter.toString());
  }, [taskIdCounter]);

  // Hent opgaver fra localStorage ved initialisering
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      // Initialiser checked med samme længde som tasks
      setChecked(new Array(parsedTasks.length).fill(false));
    }
  }, []);

  // Gem opgaver i localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Funktion til at tilføje ny opgave
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
    setChecked((prevChecked) => [...prevChecked, false]); // Tilføj en 'false' værdi for den nye opgave
    setTaskIdCounter(id + 1); // Øg taskIdCounter korrekt
  };

   // Toggle-funktion til at ændre 'checked' state
   const handleToggle = (index: number) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = !updatedChecked[index]; // Skift værdien ved den valgte indeks
    setChecked(updatedChecked);
  };


  // Funktion til at slette alle opgaver
  const handleDeleteAll = () => {
    setTasks([]); // Tøm listen med opgaver
    setChecked([]); // Tøm listen med 'checked' værdier
  };

  // Funktion til at opdatere en eksisterende opgave
  const onUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  // Funktion til at slette en bestemt opgave
  const onDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);  // Filtrér opgaver og fjern den valgte opgave
    const updatedChecked = checked.filter((_, index) => tasks[index].id !== taskId);  // Opdater checked-arrayet ved at filtrere de værdier, der matcher taskId
    setTasks(updatedTasks);
    setChecked(updatedChecked);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <NewTask addNewTask={addNewTask} />
      <TaskList
        tasks={tasks}
        checked={checked}
        handleToggle={handleToggle}
        handleDeleteAll={handleDeleteAll}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />

    </div>
  );
};

export default App;
