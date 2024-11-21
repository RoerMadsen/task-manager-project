import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Tooltip,
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

const TaskItem = ({ task, onUpdateTask, onDeleteTask }: TaskItemProps) => {
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
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

  const handleChangeRemind = (e: SelectChangeEvent<string>) => {
    setEditedTask((prev) => ({
      ...prev,
      remind: e.target.value
    }));
  };

  return (
    <>
      <Accordion>
        <Tooltip
          title="Vis hele opgaven"
          placement="top-end"
          aria-label="Vis hele opgaven">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
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
              <Tooltip
                title="Rediger opgave"
                placement="bottom"
                aria-label="Rediger opgave">
                <IconButton
                  aria-label="Rediger opgave"
                  onClick={handleOpenSettingDialog}
                  sx={{
                    color: themeColors.primaryColor,
                    "&:hover": {
                      color: themeColors.primaryDark
                    }
                  }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>

              <Tooltip
                title="Slet opgave"
                placement="bottom"
                aria-label="Slet opgave">
                <IconButton
                  aria-label="Slet opgave"
                  onClick={handleOpenDeleteDialog}
                  sx={{
                    color: themeColors.secondaryColor,
                    "&:hover": {
                      color: themeColors.darkColor
                    }
                  }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Dialog til redigering af opgave */}
      <Dialog
        open={isSettingDialogOpen}
        onClose={handleCloseSettingDialog}
        aria-labelledby="rediger-opgave-dialog-title"
        aria-describedby="rediger-opgave-dialog-description">
        <DialogTitle id="rediger-opgave-dialog-title">
          Rediger Opgave
        </DialogTitle>
        <DialogContent id="rediger-opgave-dialog-description">
          <TextField
            label="Opgavenavn"
            name="taskName"
            value={editedTask.taskName}
            onChange={handleTextFieldChange}
            fullWidth
            margin="dense"
            aria-label="Opgavenavn"
          />

          <FormControl
            fullWidth
            margin="dense"
            required
            aria-label="Vælg Kategori">
            <InputLabel id="category-label">Vælg Kategori</InputLabel>
            <Select
              labelId="category-label"
              value={editedTask.category}
              name="category"
              onChange={handleChange}
              aria-label="Kategori">
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            margin="dense"
            required
            aria-label="Vælg Prioritet">
            <InputLabel id="priority-label">Vælg Prioritet</InputLabel>
            <Select
              labelId="priority-label"
              value={editedTask.priority}
              name="priority"
              onChange={handleChange}
              aria-label="Prioritet">
              {priorityOptions.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Hvornår"
            name="chooseDate"
            value={editedTask.chooseDate}
            onChange={handleTextFieldChange}
            fullWidth
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            aria-label="Vælg dato"
          />

          <FormControl fullWidth margin="dense" aria-label="Gentagelse">
            <InputLabel id="repeat-select-label">Gentagelse</InputLabel>
            <Select
              labelId="repeat-select-label"
              value={editedTask.repeatTask}
              name="repeatTask"
              onChange={handleChange}
              aria-label="Gentagelse">
              {repeatOptions.map((repeat) => (
                <MenuItem key={repeat} value={repeat}>
                  {repeat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense" aria-label="Påmindelse">
            <InputLabel id="remind-select-label">Påmindelse</InputLabel>
            <Select
              labelId="remind-select-label"
              value={editedTask.remind}
              name="remind"
              onChange={handleChangeRemind}
              aria-label="Påmindelse">
              {remindOptions.map((remindOption) => (
                <MenuItem key={remindOption} value={remindOption}>
                  {remindOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseSettingDialog}
            color="primary"
            aria-label="Luk">
            Luk
          </Button>
          <Button
            onClick={handleUpdateTask}
            color="primary"
            aria-label="Opdater">
            Opdater
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog til sletning af opgave */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-opgave-dialog-title"
        aria-describedby="delete-opgave-dialog-description">
        <DialogTitle id="delete-opgave-dialog-title">
          Er du sikker på, at du vil slette denne opgave?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            color="primary"
            aria-label="Annuller">
            Anuller
          </Button>
          <Button
            onClick={() => {
              onDeleteTask(task.id);
              handleCloseDeleteDialog();
            }}
            color="secondary"
            aria-label="Slet opgave">
            Slet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
