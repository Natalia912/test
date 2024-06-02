<template>
  <div class="actions">
    <input class="input actions__search" type="search" placeholder="Поиск" :value="tasksStore.search" @change="setValue"/>
    <button class="button" @click="tasksStore.modal = true">Добавить задачу</button>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '../store/tasksStore';

const tasksStore= useTasksStore()

const setValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  tasksStore.search = target.value
}
</script>

<style lang="scss">
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  &__search {
    width: 280px;
  }
}
</style>