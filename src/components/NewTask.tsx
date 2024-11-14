import React, { useState, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import { themeColors } from "../theme";
import { FourMp } from "@mui/icons-material";
import TaskItem from "./TaskItem";

//Amanda - hele filen

interface NewTaskProps {
  addNewTask: (
    taskName: string,
    category: string,
    priority: string,
    chooseDate: string,
    repeatTask: string,
    remind: string[]
  ) => void;
}

const NewTask = ({ addNewTask }: NewTaskProps) => {
  const theme = useTheme();
  const [taskName, setTaskName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState("");
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

  const priorityOptions = ["Meget Vigtig", "Vigtig", "Ikke Vigtig"];

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
    // Log de data, der bliver sendt til addNewTask
    const newTask = {
      taskName,
      categoryName,
      priority,
      chooseDate,
      repeatTask,
      remind
    };
    console.log("Opgave data før oprettelse:", newTask);

    // Hvis alle felter er fyldt, kaldes addNewTask og felterne resettes
    addNewTask(
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
    setRemind([]);
    setError(null); // Fjerner fejlmeddelelsen
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
      <Box
        sx={{ minWidtt: 120, display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {/** Felt til Ny Opgave Navn */}
        <TextField
          label="Tilføj Ny Opgave"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          required
        />

        {/** Felt til Vælg Kategori */}
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

        {/** Felt til Vælg Prioritet */}
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

        {/** Felt til Vælg Dato */}
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

        {/** Felt til Vælg Gentagelse */}
        <FormControl fullWidth>
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

        {/** Felt til Vælg Påmindelse */}
        <FormControl fullWidth>
          <InputLabel id="remind-multiple-chip-label">Remind</InputLabel>
          <Select
            labelId="remind-multiple-chip-label"
            id="remind-multiple-chip"
            multiple
            value={remind}
            onChange={handleChangeRemind}
            input={<OutlinedInput id="select-multiple-chip" label="Remind" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            disabled={remind.includes("aldrig")}>
            {remindOptions.map((remindOption) => (
              <MenuItem key={remindOption} value={remindOption}>
                {remindOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: themeColors.primaryColor }}>
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default NewTask;
