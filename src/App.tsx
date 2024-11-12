import React, { useState } from "react";
import NewTask from "./components/NewTask";

const App = () => {
  // State til at holde opgaven og dens oplysninger
  const [tasks, setTasks] = useState<
    {
      taskName: string;
      category: string;
      chooseDate: string;
      repeatTask: string;
      remind: string[];
    }[]
  >([]);

  // Funktion til at tilføje en ny opgave
  const addNewTask = (
    taskName: string,
    category: string,
    chooseDate: string,
    repeatTask: string,
    remind: string[]
  ) => {
    const newTask = { taskName, category, chooseDate, repeatTask, remind };
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>The Mental Load</h1>
      <NewTask addNewTask={addNewTask} />

      {/* Vis alle opgaver */}
      <div className="grid-container">
        <h2>Alle Opgaver</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.taskName}</strong>
              <br />
              Kategori: {task.category}
              <br />
              {task.chooseDate}
              <br />
              Opgaven gentages {task.repeatTask}
              <br />
              Påmindelse er sat til: {task.remind.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
