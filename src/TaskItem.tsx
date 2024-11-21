import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Checkbox,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { themeColors } from "./theme";

interface Task {
  id: number;
  taskName: string;
  category: string;
  priority: string;
  chooseDate: string;
  repeatTask: string;
  remind: string;
}

interface TaskItemProps {
  task: Task;
  checked: boolean;
  onToggle: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskItem = ({
  task,
  checked,
  onToggle,
  onUpdateTask,
  onDeleteTask
}: TaskItemProps) => {
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

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

  const handleOpenSettingDialog = () => {
    setEditedTask(task);
    setIsSettingDialogOpen(true);
  };

  const handleCloseSettingDialog = () => {
    setIsSettingDialogOpen(false);
  };

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

  const handleUpdateTask = () => {
    onUpdateTask(editedTask);
    handleCloseSettingDialog();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
      }}>
      <Accordion>
        <Tooltip title="Vis hele opgaven" placement="top-end">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                <p className="bold">{task.taskName}</p>
              </Typography>
            </Box>
          </AccordionSummary>
        </Tooltip>

        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}>
            <Box>
              <Typography>
                <strong>Kategori: {task.category}</strong>
              </Typography>
              <Typography>Prioritet: {task.priority}</Typography>
              <Typography>Gentagelse: {task.repeatTask}</Typography>
              <Typography>Påmindelse: {task.remind}</Typography>
            </Box>

            <Box>
              <Tooltip title="Rediger opgave" placement="bottom">
                <IconButton
                  onClick={handleOpenSettingDialog}
                  sx={{
                    color: themeColors.primaryColor,
                    "&:hover": { color: themeColors.primaryDark }
                  }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Slet opgave" placement="bottom">
                <IconButton
                  onClick={() => onDeleteTask(task.id)}
                  sx={{
                    color: themeColors.secondaryColor,
                    "&:hover": { color: themeColors.darkColor }
                  }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* Checkbox udenfor Accordion */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between"
        }}>
        <Checkbox checked={checked} onChange={onToggle} />
      </Box>

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
          {/* Kategori, Prioritet, Dato, etc. (Same code as before) */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettingDialog}>Annuller</Button>
          <Button onClick={handleUpdateTask} variant="contained">
            Opdater Opgave
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskItem;
