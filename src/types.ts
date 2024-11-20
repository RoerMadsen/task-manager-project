export interface Task {
  id: number;
  taskName: string;
  category: string;
  priority: string;
  chooseDate: string;
  repeatTask: string;
  remind: string;
  isChecked?: boolean; // Tilføj denne egenskab
}
