<template>
  <div class="container">
    <Actions />
    <TasksList />
    <TaskModal 
      v-if="tasksStore.modal" 
      :task="tasksStore.currentTask" 
      @add="addTask" 
      @edit="editTask" 
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Actions from "./components/Actions.vue"
import TasksList from "./components/TasksList.vue"
import TaskModal from './components/TaskModal.vue';
import { useTasksStore } from "./store/tasksStore";
import { EditableFields } from "./types";
const tasksStore = useTasksStore()

const addTask = async (task: EditableFields) => {
  await tasksStore.addTask({...task, completed: false})
}

const editTask = async (task: EditableFields) => {
  if (tasksStore.currentTask) {
    await tasksStore.changeTask({ ...tasksStore.currentTask,...task})
  }
}

const closeModal = () => {
  tasksStore.modal = false
  tasksStore.currentTask = null
}
</script>

<style lang="scss">
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .container {
    width: 600px;
    padding: 24px;
    min-height: 400px;
  }
</style>
