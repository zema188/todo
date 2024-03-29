<script setup>
import { useTodoStore } from '@/stores/todo'
import IconCross from '@/components/icons/IconCross.vue';
import IconComplete from '@/components/icons/IconComplete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';

const todoStore = useTodoStore()

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})


const editTask = () => {
    todoStore.paramsEditibleTask = {...props.item}
    todoStore.modalType = 'edit'
    todoStore.modalIsActive = true
}
</script>

<template>
    <div class="todo__item"
        :class="{complete: props.item.isCompleted}"
    >
        <span class="todo__item-title">
            {{ props.item.title }}
        </span>
        <span class="todo__item-description">
            {{ props.item.description }}
        </span>
        <div class="todo__item-btns">
            <button class="complete"
                @click="todoStore.toggleComplete(props.item.id)"
            >
                <icon-complete/>
            </button>

            <button class="edit"
                :disabled="props.item.isCompleted"
                @click="editTask(props.item.id)"
            >
                <icon-edit/>
            </button>

            <button class="cross"
                @click="todoStore.deleteTask(props.item.id)"
            >
                <icon-cross/>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.todo {

    &__item {
        border: 1px solid rgba(187, 255, 209, 1);
        border-radius: 8px;
        padding: 10px 100px 10px 10px;
        min-height: 90px;
        position: relative;
        background: rgba(187, 255, 209, 1);
        transition: .2s;

        &:hover {
            & .complete {
                opacity: 1;
            }
        }

        &.complete {
            background: rgba(187, 233, 231, 0.73);
            border-color: rgba(187, 233, 231, 0.73);            
            & .todo__item-title {
                opacity: 0.4;
            }

            & .todo__item-description {
                opacity: 0.4;
            }

            & .complete {
                opacity: 1;
            }
            & .edit {
                opacity: 0.5;
            }
        }
    }

    &__item-title {
        display: block;
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: bold;
        transition: .2s;
    }

    &__item-description {
        display: block;
        transition: .2s;
    }

    &__item-btns {
        position: absolute;
        right: 10px;
        top: 10px;
        display: flex;

        & button {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: .2s;
            &:disabled {
                cursor: default;
            }

            &.complete {
                opacity: 0;
                & svg {
                    width: 27px;
                }
            }

            &.edit {
                & svg {
                    width: 27px;
                }
            }

            &.cross {
                & svg {
                    width: 27px;
                }
            }
        }
    }
}
</style>