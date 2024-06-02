<template>
 <div class="modal">
    <div class="modal__content">
      <button class="button button--icon modal__close" aria-label="Close modal" @click="emit('close')">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.5L16.5 16.5" stroke="white" stroke-width="1.5"/>
            <path d="M16.5 1.5L1.5 16.5" stroke="white" stroke-width="1.5"/>
          </svg>
      </button>
      <form class="modal__form" @submit.prevent="save">
        <div class="input-container">
          <label for="name">Название</label>
          <input type="text" name="name" required :value="taskData.title" @change="setTitle" class="input" placeholder="Введите название"/>
        </div>
        <div class="input-container">
          <label for="description">Описание</label>
          <input type="text" name="description" :value="taskData.description" @change="setDescription" class="input" placeholder="Введите описание"/>
        </div>
        <div class="input-container">
          <label for="date">Срок выполнения</label>
          <input type="date" name="date" class="input" :value="taskData.dueDate" @change="setDate" placeholder="Введите срок выполнения"/>
        </div>
        <button class="button">Сохранить</button>
      </form>
    </div>
 </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { EditableFields, Task } from '../types';

type ModalProps = {
  task: Task | null
}
const props = defineProps<ModalProps>()
const emit = defineEmits(['add', 'edit', 'close'])
const taskData = reactive<EditableFields>({
  title: '',
  description: '',
  dueDate: ''
})

onMounted(() => {
  if (props.task) {
    taskData.title = props.task.title
    taskData.description = props.task.description
    taskData.dueDate = props.task.dueDate
  }
})

const save = async () => {
  if (!props.task) {
    emit('add', taskData)
  } else {
    emit('edit', taskData)
  }
  emit('close')
}

const setTitle = (event: Event) => {
  taskData.title = (event.target as HTMLInputElement).value 
}
const setDescription = (event: Event) => {
  taskData.description = (event.target as HTMLInputElement).value 
}
const setDate = (event: Event) => {
  taskData.dueDate = (event.target as HTMLInputElement).value 
}
</script>

<style lang="scss">
.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 8px;
    border-radius: 6px;
  }
  &__close {
    align-self: flex-end;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 30px 20px;

    button {
      margin-top: 30px;
    }
  }
}
</style>