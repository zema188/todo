<script setup>
import { useTodoStore } from '@/stores/todo'
import TodoItem from '@/components/todo/TodoItem.vue';

const todoStore = useTodoStore()

</script>

<template>
    <div class="todo__list">
        <todo-item
            v-for="item of todoStore.tasks"
            :key="item"
            :item="item"
        />
    </div>

</template>

<style scoped lang="scss">
.todo {
    &__list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
}
</style>