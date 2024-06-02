export type TaskID = number | string

export type Task = {
  id: TaskID,
  title: string,
  description: string,
  dueDate: string,
  completed: boolean
}

export type NewTask = Omit<Task, 'id'>

export type EditableFields = Omit<Task, 'id' | 'completed'>

