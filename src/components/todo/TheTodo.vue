<script setup>
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo'
import TodoList from '@/components/todo/TodoList.vue';
import TodoModal from '@/components/todo/TodoModal.vue';

const todoStore = useTodoStore()

const addTask = () => {
    todoStore.modalType = 'create'
    todoStore.modalIsActive = true
}

onMounted(() => {
    todoStore.getTasksFromDataBase()
})
</script>

<template>
    <div class="todo">
        <div class="todo__header">
            <h2 class="todo__title">
                Список задач
            </h2>

            <button class="todo__header-btn btn btn_green"
                @click="addTask()"
            >
                Добавить задачу
            </button>
        </div>

        <todo-list v-if="todoStore.tasks.length"/>

        <p v-else>
            Список задач пуст...
        </p>

        <todo-modal/>
    </div>
</template>

<style scoped lang="scss">
.todo {
    padding: 20px 0px;
    max-width: 700px;
    margin: 0 auto;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 30px;
        @media (max-width: 539px) {
            gap: 10px;
        }
    }

    &__header-btn {
        width: fit-content;
    }

    &__title {
        font-weight: bold;
        font-size: 30px;
        @media (max-width: 539px) {
            font-size: 20px;
        }
    }
}
</style>