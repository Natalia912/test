<template>
  <li :class="`task ${props.task.completed ? 'task--state-finished' : ''} ${isOutdated ? 'task--state-outdated' : ''}`">
    <div class="task__checkbox">
      <input type="checkbox" :id="checkboxId" :checked="props.task.completed" @change="updateCheckbox"/>
    </div>
    <div class="task__info">
      <label :for="checkboxId" class="task__title">{{ props.task.title }}</label>
      <span :for="checkboxId" class="task__date">{{ displayDate }}</span>
    </div>
    <div class="task__actions">
      <button class="button" @click="emit('delete')">Удалить</button>
      <button class="button" @click="emit('edit')">Редактировать</button>
    </div>
  </li>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Task } from '../types';
import { formatDate, getDif } from '../utils/helpers';

const props = defineProps<{task: Task}>()
const emit = defineEmits(['delete', 'edit', 'updateCheckbox'])

const checkboxId = computed(() => `checkbox-${props.task.id}`)

const isOutdated = computed(() => {
  const dif = getDif(props.task.dueDate)
  if (dif < 0) {
    return true
  }
  return false
})

const displayDate = computed(() => formatDate(props.task.dueDate))

const updateCheckbox = (event: Event) => {
  const value = (event.target as HTMLInputElement).checked
  emit('updateCheckbox', value)
} 
</script>

<style lang="scss">
.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: #F1F1F1;
  padding: 8px;
  border-radius: 4px;

  &__info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  };
  &__title {
    font-size: 20px;
    text-decoration: none;
  };
  &__date {
    font-size: 12px;
  };
  &__actions button:first-of-type {
    margin-right: 4px;
  }
};

.task--state-outdated {
  background-color: #FF7474;
}

.task--state-finished {
  & .task__title {
    text-decoration: line-through;
  }
}
</style>
