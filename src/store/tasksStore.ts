import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { NewTask, Task, TaskID } from "../types";

const api = "http://localhost:3000/tasks" as const


export const useTasksStore = defineStore('tasks', () => {

  const tasksList = ref<Task[] | []>([])
  const currentTask = ref<Task | null>(null)
  const search = ref<string>('')

  const modal = ref(false)

  const getTasks = async () => {
    try {
      const list = await fetch(api).then(data => data.json())
      tasksList.value = list as Task[]
    }
    catch (error){
      console.log(error)
    }
  }

  const getSearchList = async () => {
    try {
      const list = await fetch(api + '?title=' + search.value).then(data => data.json())
      tasksList.value = list as Task[]
    }
    catch (error){
      console.log(error)
    }
  }

  watch(search, async () => {
    if (search) {
      await getSearchList()
    } else {
      await getTasks()
    }
  })

  const addTask = async (task: NewTask) => {
    try {
      await fetch(api, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(task)
      })
      await getTasks()
    }
    catch (error){
      console.log(error)
    }
  }

  const changeTask = async (task: Task) => {
    try {
      await fetch(api + '/' + task.id, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(task)
      })
      await getTasks()
    }
    catch (error){
      console.log(error)
    }
  }

   const deleteTask = async (taskId: TaskID) => {
    try {
      await fetch(api + '/' + taskId, {
        method: "DELETE",
      })
      tasksList.value = tasksList.value.filter(item => item.id !== taskId)
    }
    catch (error){
      console.log(error)
    }
  }

  return { tasksList, currentTask, search, modal, getTasks,getSearchList, addTask, changeTask, deleteTask }
})