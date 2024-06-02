<template>
  <ul class="tasks">
    <TaskElement 
      v-for="task of tasksStore.tasksList" 
      :task="task" 
      :key="task.id" 
      @edit="openModal(task)"
      @update-checkbox="(val: boolean) => updateCheckbox(task, val)"
      @delete="deleteTask(task.id)"/>
  </ul>
</template>
<!--  -->
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useTasksStore } from '../store/tasksStore';
import TaskElement from './TaskElement.vue'
import { Task, TaskID } from '../types';
const tasksStore = useTasksStore()

onMounted(async () => {
  await tasksStore.getTasks()
})

const openModal = (task: Task) => {
  tasksStore.currentTask = task
  tasksStore.modal = true
}
const updateCheckbox = async (task: Task, newVal: boolean) => {
  await tasksStore.changeTask({...task, completed: newVal})
}
const deleteTask = async (id: TaskID) => {
  const conf = window.confirm('Are you sure you want to delete the task?')
  if (conf) {
    await tasksStore.deleteTask(id)
  }
}
</script>

<style lang="scss">
.tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding-inline-start: 0;
  margin: 0;
}
</style>