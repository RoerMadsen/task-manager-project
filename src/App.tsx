import React, { useState } from "react";

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
    <div className="grid-container">
      <div className="grid-item">
        <h1>The Mental Load</h1>
      </div>
      <div className="grid-item">
        {/* Vis alle opgaver */}
        <h2>Alle Opgaver</h2>
        <ul>
          {tasks.map((task, index) => (
            //TS der sorterer opgaver efter kateogori og flytter udførte opgaver til bunden af listen
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