<script setup>
import { useTodoStore } from '@/stores/todo'
import { computed } from 'vue';
import IconCross from '@/components/icons/IconCross.vue';

const todoStore = useTodoStore()

const closemodal = () => {
    todoStore.closeModal()
}

const sendTask = () => {
    if(todoStore.modalType === 'create') {
        todoStore.addTask()
    } else {
        todoStore.updateTask(todoStore.paramsEditibleTask.id)
    }
}

const isDisabledSendBtn = computed(() => {
    return !todoStore.paramsEditibleTask.title || !todoStore.paramsEditibleTask.description
})
</script>

<template>
    <div class="modal"
        :class="{active: todoStore.modalIsActive}"
        @click.stop.self="closemodal()"
    >
        <div class="modal__body">
            <div class="modal__content">
                <div class="modal__list">
                    <div class="modal__field">
                        <span>
                            Заголовок
                        </span>
                        <span class="error">
                            {{ todoStore.errors.title }}
                        </span>
                        <div class="input-w">
                            <input v-model="todoStore.paramsEditibleTask.title"
                                @keydown.enter="sendTask()"
                            >
                        </div>
                    </div>
                    <div class="modal__field">
                        <span>
                            Описание
                        </span>
                        <span class="error">
                            {{ todoStore.errors.description }}
                        </span>
                        <div class="input-w">
                            <textarea v-model="todoStore.paramsEditibleTask.description"
                                @keydown.prevent.enter="sendTask()"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal__btns">
                    <button class="modal__btns-item btn btn_green"
                        :disabled="isDisabledSendBtn"
                        @click="sendTask()"
                    >

                        <span v-if="todoStore.modalType === 'create'">
                            Создать
                        </span>

                        <span v-else>
                        Сохранить
                        </span>
                    </button>
                </div>
                <button class="modal__close"
                    @click="closemodal()"
                >
                    <icon-cross/>
                </button>
            </div>	
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    display: none;
    z-index: 10;
    &.active {
      display: block;
    }
    &::before {
        content: "";
        background: #000000;
        opacity: 0.7;
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 104;
    }

    &__body {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 10px;
        min-height: 100%;
    }

    &__content {
        position: relative;
        background: var(--var-modal-bg);
        border-radius: 20px;
        padding: 30px;
        width: 95%;
        max-width: 715px;
        z-index: 105;
        background: #fff;
        @media (max-width: 539px) {
            padding: 35px 15px 38px;
        }
    }

    &__close {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 30px;
    }

    &__field {
        & span {
            font-weight: bold;
        }
        & .error {
            color: red;
        }
    }
}

.input-w {
    border-radius: 12px;
    border: 1px solid #969696;
    & input, textarea {
        color: #111928;
        font-family: Roboto;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 167%; /* 26.72px */
        border-radius: 12px;
        width: 100%;
        background: rgba(255,255,255,0);
        padding: 10px 10px;
        @media (max-width: 539px) {
            padding: 10px 15px;
        }
    }
    & textarea {
        height: 180px;
        resize: none;
    }
}
</style>