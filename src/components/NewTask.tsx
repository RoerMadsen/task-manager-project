import React, { useState, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import { useTheme, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface NewTaskProps {
  addNewTask: (
    taskName: string,
    category: string,
    chooseDate: string,
    repeatTask: string,
    remind: string[]
  ) => void;
}

const NewTask = ({ addNewTask }: NewTaskProps) => {
  const theme = useTheme();
  const [taskName, setTaskName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [chooseDate, setChooseDate] = useState("");
  const [repeatTask, setRepeatTask] = useState("");
  const [remind, setRemind] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const repeatOptions = [
    "dagligt",
    "hver anden dag",
    "ugentligt",
    "hver 2. uge",
    "hver 3. uge",
    "månedligt"
  ];

  const remindOptions = ["morgen", "aften", "aldrig"];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Tjekker om de krævede felter er udfyldt
    if (!taskName || !categoryName || !chooseDate) {
      setError("Alle felter skal udfyldes.");
      return;
    }

    // Hvis alle felter er fyldt, kaldes addNewTask og felterne resettes
    addNewTask(taskName, categoryName, chooseDate, repeatTask, remind);
    setTaskName("");
    setCategoryName("");
    setChooseDate("");
    setRepeatTask("");
    setRemind([]);
    setError(null); // Fjerner fejlmeddelelsen
  };

  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    setCategoryName(event.target.value);
  };

  const handleChangeRepeat = (event: SelectChangeEvent<string>) => {
    setRepeatTask(event.target.value);
  };

  const handleChangeRemind = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;
    setRemind(
      // På autofill får vi en stringified værdi
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="warning">
          <AlertTitle>Udfyld felterne for at fortsætte</AlertTitle>
          {error}
        </Alert>
      )}

      <TextField
        label="Tilføj Ny Opgave"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
        required
      />
      <FormControl sx={{ m: 1, width: 300 }} required>
        <InputLabel id="demo-category-label">Vælg Kategori</InputLabel>
        <Select
          labelId="demo-category-label"
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
      <TextField
        className="inputField"
        label="Hvornår skal opgaven udføres?"
        type="date"
        value={chooseDate}
        onChange={(e) => setChooseDate(e.target.value)}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="repeat-select-label">Repeat</InputLabel>
        <Select
          labelId="repeat-select-label"
          id="repeat-select"
          value={repeatTask}
          onChange={handleChangeRepeat}>
          {repeatOptions.map((repeat) => (
            <MenuItem key={repeat} value={repeat}>
              {repeat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="remind-select-label">Remind</InputLabel>
        <Select
          labelId="remind-select-label"
          id="remind-select"
          multiple
          value={remind}
          onChange={handleChangeRemind}
          disabled={remind.includes("aldrig")}>
          {remindOptions.map((remindOption) => (
            <MenuItem key={remindOption} value={remindOption}>
              {remindOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default NewTask;
