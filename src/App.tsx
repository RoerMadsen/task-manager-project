import React, { useState, useEffect } from "react";
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import { Task } from "./types";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskIdCounter, setTaskIdCounter] = useState<number>(1);
  const [checked, setChecked] = useState<boolean[]>([]);

  // Hent taskIdCounter fra localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("taskIdCounter");
    if (storedId) setTaskIdCounter(parseInt(storedId, 10));
  }, []);

  // Gem taskIdCounter til localStorage
  useEffect(() => {
    localStorage.setItem("taskIdCounter", taskIdCounter.toString());
  }, [taskIdCounter]);

  // Hent opgaver og checked-tilstand fra localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedChecked = localStorage.getItem("checked");

    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setChecked(new Array(tasks.length).fill(false)); // Synkroniser checked med tasks
  }, [tasks]);

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
    setTaskIdCounter(id + 1);
  };

  const handleToggle = (index: number) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = !updatedChecked[index];
    setChecked(updatedChecked);
  };

  const handleDeleteAll = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  const onUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const onDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="grid-container">
      <div className="header">
        <h1>Task Manager</h1>
      </div>
      <div className="grid-item">
        <NewTask addNewTask={addNewTask} />
      </div>
      <div className="grid-item">
        <TaskList
          tasks={tasks}
          checked={checked}
          handleToggle={handleToggle}
          handleDeleteAll={handleDeleteAll}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
};

export default App;
