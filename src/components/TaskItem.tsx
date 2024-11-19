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
  TextField,
  DialogActions,
  Button,
  DialogContentText
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon

interface Task {
  id: number;
  taskName: string;
  category: string;
  priority: string;
  chooseDate: string;
  repeatTask: string;
  remind: string[];
}

interface TaskItemProps {
  task: Task;
  checked: boolean;
  onToggle: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: () => void; // Function to handle task deletion
}

const TaskItem = ({ task, checked, onToggle, onUpdateTask, onDeleteTask }: TaskItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete confirmation dialog

  const handleOpenDialog = () => {
    setEditedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateTask = () => {
    onUpdateTask(editedTask);
    handleCloseDialog();
  };

  // Handle delete confirmation dialog
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteTask = () => {
    onDeleteTask();
    handleCloseDeleteDialog();
  };

  return (
    <>
      <Accordion sx={{ mb: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-${task.id}-content`}
          id={`panel-${task.id}-header`}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              width: "100%"
            }}
          >
            <Checkbox
              edge="start"
              checked={checked}
              onChange={onToggle}
              inputProps={{ "aria-label": "Task completed" }}
            />
            <Typography sx={{ flexGrow: 1 }}>
              <strong>{task.taskName}</strong>
            </Typography>
            <IconButton onClick={handleOpenDialog}>
              <SettingsIcon />
            </IconButton>
            {/* Delete button */}
            <IconButton onClick={handleOpenDeleteDialog}>
              <DeleteIcon />
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
              <strong>Påmindelse:</strong> {task.remind.join(", ")}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Rediger Opgave</DialogTitle>
        <DialogContent>
          <TextField
            label="Opgavenavn"
            name="taskName"
            value={editedTask.taskName}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Kategori"
            name="category"
            value={editedTask.category}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Prioritet"
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Hvornår"
            name="chooseDate"
            value={editedTask.chooseDate}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Gentagelse"
            name="repeatTask"
            value={editedTask.repeatTask}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Påmindelse"
            name="remind"
            value={editedTask.remind.join(", ")}
            onChange={(e) =>
              setEditedTask((prev) => ({
                ...prev,
                remind: e.target.value.split(",").map((s) => s.trim())
              }))
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuller</Button>
          <Button onClick={handleUpdateTask} variant="contained">
            Opdater Opgave
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Bekræft Sletning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Er du sikker på, at du vil slette denne opgave?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Annuller</Button>
          <Button onClick={handleDeleteTask} color="error" variant="contained">
            Slet Opgave
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
