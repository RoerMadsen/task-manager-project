import React, { useState, FormEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { themeColors } from "./theme";

interface NewTaskProps {
  addNewTask: (
    id: number,
    taskName: string,
    categoryName: string,
    priority: string,
    chooseDate: string,
    repeatTask: string,
    remind: string
  ) => void;
}

const NewTask = ({ addNewTask }: NewTaskProps) => {
  const [taskName, setTaskName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState("");
  const [chooseDate, setChooseDate] = useState(
    new Date().toISOString().split("T")[0]
  ); //bruger dags dato som default
  const [repeatTask, setRepeatTask] = useState("");
  const [remind, setRemind] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false); // Ny state til succesmeddelelse

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
    "Andet"
  ];
  const priorityOptions = ["1", "2", "3"];
  const repeatOptions = [
    "dagligt",
    "hver anden dag",
    "ugentligt",
    "hver 2. uge",
    "hver 3. uge",
    "månedligt",
    "aldrig"
  ];
  const remindOptions = ["morgen", "aften", "aldrig"];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!taskName || !categoryName || !priority || !chooseDate) {
      setError("Alle obligatoriske felter skal udfyldes.");
      setSuccess(false);
      return;
    }

    const newTask = {
      id: Date.now(),
      taskName,
      categoryName,
      priority,
      chooseDate,
      repeatTask,
      remind
    };

    addNewTask(
      newTask.id,
      taskName,
      categoryName,
      priority,
      chooseDate,
      repeatTask,
      remind
    );

    setTaskName("");
    setCategoryName("");
    setPriority("");
    setChooseDate("");
    setRepeatTask("");
    setRemind("");
    setError(null);
    setSuccess(true); // Vis succesmeddelelsen

    // Automatisk skjul succesmeddelelse efter 5 sekunder
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    setCategoryName(event.target.value);
  };

  const handleChangePriority = (event: SelectChangeEvent<string>) => {
    setPriority(event.target.value);
  };

  const handleChangeRepeat = (event: SelectChangeEvent<string>) => {
    setRepeatTask(event.target.value);
  };

  const handleChangeRemind = (event: SelectChangeEvent<string>) => {
    setRemind(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="warning">
          <AlertTitle>Udfyld felterne for at fortsætte</AlertTitle>
          {error}
        </Alert>
      )}

      {/** Backdrop med succesmeddelelse */}
      <Backdrop
        open={success}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(5px)"
        }}>
        <Alert
          severity="success"
          variant="outlined"
          sx={{
            color: themeColors.primaryColor,
            borderColor: themeColors.primaryColor,
            backgroundColor: "#fff"
          }}>
          <AlertTitle>Succes</AlertTitle>
          Opgaven er oprettet, du kan nu se den på listen over dine opgaver
        </Alert>
      </Backdrop>

      <Box
        sx={{ minWidth: 120, display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <TextField
          label="Tilføj Ny Opgave"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          required
        />
        <FormControl fullWidth required>
          <InputLabel id="category-label">Vælg Kategori</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={categoryName}
            onChange={handleChangeCategory}
            input={<OutlinedInput label="Category" />}>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel id="priority-label">Vælg Prioritet</InputLabel>
          <Select
            id="priority-select"
            value={priority}
            onChange={handleChangePriority}
            input={<OutlinedInput label="Priority" />}>
            {priorityOptions.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Hvornår skal opgaven udføres?"
          type="date"
          value={chooseDate}
          onChange={(e) => setChooseDate(e.target.value)}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth>
          <InputLabel id="repeat-select-label">Repeat</InputLabel>
          <Select
            labelId="repeat-select-label"
            id="repeat-select"
            value={repeatTask}
            onChange={handleChangeRepeat}>
            {repeatOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="remind-label">Påmindelse</InputLabel>
          <Select
            labelId="remind-label"
            id="remind-select"
            value={remind}
            onChange={handleChangeRemind}>
            {remindOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Tilføj Opgave
        </Button>
      </Box>
    </form>
  );
};

export default NewTask;
