export interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}
export interface Board {
  boardId: number;
  boardTitle: string;
  columns?: Column[];
}

interface Column {
  columnId: number;
  columnTitle: string;
  tasks?: Task[];
}

interface Task {
  taskId: number;
  taskTitle: string;
}
