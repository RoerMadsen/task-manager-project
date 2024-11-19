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
import { themeColors } from "./theme";


interface NewTaskProps {
  addNewTask: (
    id: number,
    taskName: string,
    category: string,
    priority: number,
    chooseDate: string,
    repeatTask: string,
    remind: string[]
  ) => void;
}

const NewTask = ({ addNewTask }: NewTaskProps) => {
  const theme = useTheme();

  // State til at holde styr på opgave-ID (starter ved 1)
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  // State til at holde værdier for hver opgave
  const [taskName, setTaskName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [priority, setPriority] = useState(1);
  const [chooseDate, setChooseDate] = useState("");
  const [repeatTask, setRepeatTask] = useState("");
  const [remind, setRemind] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Kategorier, prioriteter og valgmuligheder til gentagelse/påmindelser
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
  const priorityOptions = [1, 2, 3];
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

  // Håndtering af form-submit (oprette ny opgave)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validering: Hvis obligatoriske felter ikke er udfyldt, vis fejl
    if (!taskName || !categoryName || !priority || !chooseDate) {
      setError("Alle obligatoriske felter skal udfyldes.");
      return;
    }

    // Opret ny opgave med det nuværende taskIdCounter som unikt ID
    const newTask = {
      id: taskIdCounter,
      taskName,
      categoryName,
      priority,
      chooseDate,
      repeatTask,
      remind
    };

    console.log("Ny opgave data:", newTask);

    // Tilføj opgaven og opdater tælleren for næste opgave-ID
    addNewTask(
      taskIdCounter,
      taskName,
      categoryName,
      priority,
      chooseDate,
      repeatTask,
      remind
    );
    setTaskIdCounter(taskIdCounter + 1); // Øger ID-tælleren med 1

    // Nulstil felter efter tilføjelse af opgave
    setTaskName("");
    setCategoryName("");
    setPriority(1);
    setChooseDate("");
    setRepeatTask("");
    setRemind([]);
    setError(null); // Fjerner fejlmeddelelsen
  };

  // Håndtering af ændringer for kategori
  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    setCategoryName(event.target.value);
  };

  // Håndtering af ændringer for prioritet
  const handleChangePriority = (event: SelectChangeEvent<string>) => {
    const selectedPriority = parseInt(event.target.value); // Konverter værdi til tal
    setPriority(selectedPriority);

  };

  // Håndtering af ændringer for gentagelse
  const handleChangeRepeat = (event: SelectChangeEvent<string>) => {
    setRepeatTask(event.target.value);
  };

  // Håndtering af ændringer for påmindelser
  // Håndtering af ændringer for påmindelser (kun én valgmulighed)
  const handleChangeRemind = (event: SelectChangeEvent<string>) => {
    const {
      target: { value }
    } = event;
    setRemind([value]); // Sætter kun én værdi, ikke en liste
  };

  return (
    <form onSubmit={handleSubmit}>
      {/** Fejlmeddelelse, hvis felter ikke er udfyldt korrekt */}
      {error && (
        <Alert severity="warning">
          <AlertTitle>Udfyld felterne for at fortsætte</AlertTitle>
          {error}
        </Alert>
      )}
      <Box
        sx={{ minWidtt: 120, display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {/** Inputfelt til opgavenavn */}
        <TextField
          label="Tilføj Ny Opgave"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          required
        />

        {/** Dropdown til valg af kategori */}
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

        {/** Dropdown til valg af prioritet */}
        <FormControl fullWidth required>
          <InputLabel id="priority-label">Vælg Prioritet</InputLabel>
          <Select
            id="priority-select"
            value={priority.toString()}
            onChange={handleChangePriority}
            input={<OutlinedInput label="Priority" />}>
            {priorityOptions.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/** Inputfelt til valg af dato */}
        <TextField
          label="Hvornår skal opgaven udføres?"
          type="date"
          value={chooseDate}
          onChange={(e) => setChooseDate(e.target.value)}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />

        {/** Dropdown til valg af gentagelse */}
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

        {/** Dropdown til valg af påmindelser */}
        <FormControl fullWidth>

          <InputLabel id="remind-label">Påmindelse</InputLabel>
          <Select
            labelId="remind-label"
            id="remind-select"
            value={remind[0] || ""}
            onChange={handleChangeRemind}>
            {remindOptions.map((remindOption) => (
              <MenuItem key={remindOption} value={remindOption}>
                {remindOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/** Knap til at tilføje ny opgave */}
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
