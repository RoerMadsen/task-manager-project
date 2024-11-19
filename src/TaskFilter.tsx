import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button
} from "@mui/material";

interface FilterProps {
  categories: string[];
  onFilterChange: (filters: { category: string; date: string }) => void;
}

const TaskFilter: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleFilterChange = () => {
    onFilterChange({ category, date });
  };

  return (
    <div>
      <FormControl fullWidth margin="dense">
        <InputLabel>Kategori</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Kategori">
          <MenuItem value="">Alle</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Udførelsesdato"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="dense"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Button onClick={handleFilterChange} variant="contained" sx={{ mt: 2 }}>
        Filtrer
      </Button>
    </div>
  );
};

export default TaskFilter;
