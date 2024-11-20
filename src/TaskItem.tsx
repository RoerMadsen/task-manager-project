import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";

interface Task {
  id: number;
  taskName: string;
  category: string;
  priority: string;
  chooseDate: string;
  repeatTask: string;
  remind: string; // Ændret til en enkelt værdi i stedet for et array
}

interface TaskItemProps {
  task: Task;
  checked: boolean;
  onToggle: () => void;
  onUpdateTask: (updatedTask: Task) => void; // Funktion til at opdatere opgaven
  onDeleteTask: (taskId: number) => void;
}

const TaskItem = ({ task, checked, onToggle, onUpdateTask }: TaskItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task); // Lokal kopi af opgaven til redigering

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
  const remindOptions = ["morgen", "aften", "aldrig"]; // Påmindelsesmuligheder

  // Åbn dialogboksen
  const handleOpenDialog = () => {
    setEditedTask(task); // Initialiser dialogen med aktuelle værdier

    setIsDialogOpen(true);
  };

  // Luk dialogboksen
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Håndter ændringer i formularen
  const handleChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Opdater opgaven
  const handleUpdateTask = () => {
    onUpdateTask(editedTask); // Send opdaterede værdier tilbage til parent
    handleCloseDialog(); // Luk dialogen
  };

  // Håndtering af ændringer for påmindelser (enkelt valg)
  const handleChangeRemind = (e: SelectChangeEvent<string>) => {
    setEditedTask((prev) => ({
      ...prev,
      remind: e.target.value // Opdaterer kun én påmindelse
    }));
  };

  return (
    <>
      <Accordion sx={{ mb: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-${task.id}-content`}
          id={`panel-${task.id}-header`}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              width: "100%"
            }}>
            <Checkbox
              edge="start"
              checked={checked}
              onChange={onToggle}
              inputProps={{ "aria-label": "Task completed" }}
            />
            <Typography sx={{ flexGrow: 1 }}>
              <strong>{task.taskName}</strong>
            </Typography>

            {/* Settings-ikon */}
            <IconButton onClick={handleOpenDialog}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div>
              <strong>Kategori:</strong> {task.category}
            </div>
            <div>
              <strong>Prioritet:</strong> {task.priority}
            </div>
            <div>
              <strong>Hvornår:</strong> {task.chooseDate}
            </div>
            <div>
              <strong>Gentagelse:</strong> {task.repeatTask}
            </div>
            <div>
              <strong>Påmindelse:</strong> {task.remind}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Dialog til redigering af opgave */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Rediger Opgave</DialogTitle>
        <DialogContent>
          <TextField
            label="Opgavenavn"
            name="taskName"
            value={editedTask.taskName}
            onChange={handleTextFieldChange}
            fullWidth
            margin="dense"
          />

          {/* Dropdown til valg af kategori */}
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="category-label">Vælg Kategori</InputLabel>
            <Select
              labelId="category-label"
              value={editedTask.category}
              name="category"
              onChange={handleChange}>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dropdown til valg af prioritet */}
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="priority-label">Vælg Prioritet</InputLabel>
            <Select
              labelId="priority-label"
              value={editedTask.priority}
              name="priority"
              onChange={handleChange}>
              {priorityOptions.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Inputfelt til valg af dato */}
          <TextField
            label="Hvornår"
            name="chooseDate"
            value={editedTask.chooseDate}
            onChange={handleTextFieldChange}
            fullWidth
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
          />

          {/* Dropdown til valg af gentagelse */}
          <FormControl fullWidth margin="dense">
            <InputLabel id="repeat-select-label">Gentagelse</InputLabel>
            <Select
              labelId="repeat-select-label"
              value={editedTask.repeatTask}
              name="repeatTask"
              onChange={handleChange}>
              {repeatOptions.map((repeat) => (
                <MenuItem key={repeat} value={repeat}>
                  {repeat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dropdown til valg af påmindelser (enkelt valg) */}
          <FormControl fullWidth margin="dense">
            <InputLabel id="remind-select-label">Påmindelse</InputLabel>
            <Select
              labelId="remind-select-label"
              value={editedTask.remind}
              name="remind"
              onChange={handleChangeRemind}>
              {remindOptions.map((remindOption) => (
                <MenuItem key={remindOption} value={remindOption}>
                  {remindOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuller</Button>
          <Button onClick={handleUpdateTask} variant="contained">
            Opdater Opgave
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
