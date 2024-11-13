import React, { useState, FormEvent, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface NewTaskProps {
  addNewTask: (
    taskName: string,
    category: string,
    chooseDate: string,
    repeatTask: string,
    remind: string
  ) => void;
  addCategory: (CategoryName: string) => void;
  categories: string[];
}

const NewTask = ({ addNewTask, addCategory, categories }: NewTaskProps) => {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [chooseDate, setChooseDate] = useState("");
  const [repeatTask, setRepeatTask] = useState("");
  const [remind, setRemind] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    //kun felter med required er en del af if statement
    if (taskName && category && chooseDate) {
      addNewTask(taskName, category, chooseDate, repeatTask, remind);
      setTaskName("");
      setCategory("");
      setChooseDate("");
      setRepeatTask("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <TextField
        label="Priority"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        label="Date"
        type="date"
        value={chooseDate}
        onChange={(e) => setChooseDate(e.target.value)}
      />
      <TextField
        label="Repeat"
        value={repeatTask}
        onChange={(e) => setRepeatTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default NewTask;
