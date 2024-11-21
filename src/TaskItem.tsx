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
import DeleteIcon from "@mui/icons-material/Delete"; // Importer DeleteIcon
import { themeColors } from "./theme";

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
  onDeleteTask: (taskId: number) => void; // Funktion til at slette opgaven
}

const TaskItem = ({
  task,
  checked,
  onToggle,
  onUpdateTask,
  onDeleteTask
}: TaskItemProps) => {
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
  const handleOpenSettingDialog = () => {
    setEditedTask(task); // Initialiser dialogen med aktuelle værdier

    setIsSettingDialogOpen(true);
  };

  // Luk dialogboksen
  const handleCloseSettingDialog = () => {
    setIsSettingDialogOpen(false);
  };

  //handle åben delete dialogboks
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
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
    handleCloseSettingDialog(); // Luk dialogen
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              <strong>{task.taskName}</strong>
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}>
            <Box>
              <Typography>{task.category}</Typography>
              <Typography>Prioritet: {task.priority}</Typography>
              <Typography>Gentagelse: {task.repeatTask}</Typography>
              <Typography>Påmindelse: {task.remind}</Typography>
            </Box>

            <Box>
              <IconButton onClick={handleOpenSettingDialog}>
                <SettingsIcon />
              </IconButton>
              <IconButton onClick={handleOpenDeleteDialog} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Dialog til redigering af opgave */}
      <Dialog open={isSettingDialogOpen} onClose={handleCloseSettingDialog}>
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

          {/* Dialog til bekræftelse af sletning */}
          <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Bekræft Sletning</DialogTitle>
            <DialogContent>
              <Typography>
                Er du sikker på, at du vil slette opgaven{" "}
                <strong>{task.taskName}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDeleteDialog}
                sx={{ color: themeColors.secondaryColor }}>
                Nej
              </Button>
              <Button
                onClick={() => {
                  onDeleteTask(task.id); // Bruger onDeleteTask fra App.tsx
                  handleCloseDeleteDialog(); // Luk dialogen
                }}
                variant="contained"
                sx={{
                  backgroundColor: themeColors.secondaryColor,
                  color: "#fff"
                }}>
                Ja
              </Button>
            </DialogActions>
          </Dialog>

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
          <Button onClick={handleCloseSettingDialog}>Annuller</Button>
          <Button onClick={handleUpdateTask} variant="contained">
            Opdater Opgave
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
