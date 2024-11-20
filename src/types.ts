export interface Task {
  id: number;
  taskName: string;
  category: string;
  priority: string;
  chooseDate: string;
  repeatTask: string;
  remind: string; // Ændret fra string[] til string
  isChecked?: boolean;
}
