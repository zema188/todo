import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useTodoStore = defineStore('todo', () => {

    const tasks = ref([])
    let modalIsActive = ref(false)
    let modalType = ref(null)
    let errors = ref({})

    const paramsEditibleTask = ref({})

    function addTask() {
      if(!validate()) return

      let quantityTasks = localStorage.getItem("todoTasksQuantity")

      quantityTasks ? quantityTasks++ : quantityTasks = 1

      localStorage.setItem("todoTasksQuantity", quantityTasks)

      paramsEditibleTask.value.id = quantityTasks

      tasks.value.push({...paramsEditibleTask.value})

      closeModal()
    }

    function validate() {
      errors.value = {}

      if(!paramsEditibleTask.value.title) errors.value.title = 'Поле должно быть заполнено'
      if(!paramsEditibleTask.value.description) errors.value.description = 'Поле должно быть заполнено'
      
      return Object.entries(errors.value).length ? false : true
    }

    
    function deleteTask(id) {
      tasks.value = tasks.value.filter(task => task.id !== id)
      updateTasksInDataBase()
    }

    function toggleComplete(id) {
      const index = getIndexTask(id)
      if(index !== -1) {
        tasks.value[index].isCompleted = !tasks.value[index].isCompleted
        updateTasksInDataBase()
      }
    }

    function updateTask(id) {
      if(!validate()) return

      const index = getIndexTask(id)
      if(index !== -1) {
        tasks.value[index] = {...paramsEditibleTask.value}
        closeModal()
      }
    }

    function updateTasksInDataBase() {
      localStorage.setItem("todoTasks", JSON.stringify([...tasks.value]))
    }

    function getIndexTask(id) {
      return tasks.value.findIndex(task => task.id === id)
    }

    function clearParamsTask() {
      paramsEditibleTask.value = {}
    }

    function closeModal() {
      modalIsActive.value = false
      errors.value = {}
      clearParamsTask()
      updateTasksInDataBase()
    }

    function getTasksFromDataBase() {
      let response = localStorage.getItem("todoTasks")

      if(response) {
        tasks.value = [...JSON.parse(response)]
      }
    }

    return { tasks, modalIsActive, modalType, errors, paramsEditibleTask, addTask, deleteTask, toggleComplete, updateTask, getTasksFromDataBase, closeModal }
})