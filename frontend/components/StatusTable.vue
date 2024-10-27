<template>
  <div>
    <h2 :class="[statusColor]" class="max-w-[140px] shadow-md uppercase text-center rounded-md py-[7px]">{{ title
      }}</h2>

    <ClientOnly>
      <table class="mt-[20px] bg-[#181c23] shadow-md rounded-md w-[100%] overflow-hidden">
        <thead class="text-left border-b-[1px] border-[#455266] text-[#4CCFF1]">
          <tr>
            <th class="py-[15px] px-[15px] w-[130px]">Title</th>
            <th class="py-[15px] px-[15px] w-[130px]">Status</th>
            <th class="py-[15px] px-[15px] w-[130px]">Due Date</th>
            <th class="py-[15px] px-[15px] w-[130px]"></th>
          </tr>
        </thead>

        <tbody>
          <tr :key="task.uid" v-for="task in tasks"
            class="cursor-pointer drag-task transition-all duration-[0.3s] hover:bg-[#111222]">
            <td class="py-[25px] px-[15px]">{{ task.title }}</td>
            <td class="py-[25px] px-[15px]">
              <div :class="statusColor" class="w-[130px] py-[7px] uppercase rounded-md text-center">
                <span>{{ task.status }}</span>
              </div>
            </td>
            <td class="py-[25px] px-[15px]">{{ moment(task.dueDate).format('DD/MM/YYYY') }}</td>
            <td class="py-[25px] px-[15px] flex gap-[20px]">
              <button type="button" @click="showEditModal(task.uid)"
                class=" bg-[#828282] hover:bg-[#8c8c8c] uppercase px-[10px] py-[5px] text-[14px] rounded-[5px]">
                <img class="w-[20px]" src="@/assets/img/edit.svg" alt="Profile pic">
              </button>
              <button type="submit" @click="handleDeleteTask(task.uid, task.title)"
                class="bg-[#c70000] hover:bg-[#a00000] uppercase px-[10px] py-[5px] text-[14px] rounded-[5px]">
                <img class="w-[20px]" src="@/assets/img/trash.svg" alt="Profile pic">
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </ClientOnly>

    <TaskModal v-model:isOpen="isOpen" @handleCreateNewTask="handleUpdateTask">
      <h2 class="px-[20px] mb-[30px] text-[1.875rem]">Criar nova task</h2>

      <form @submit.prevent="handleUpdateTask(editingTask?.uid)">
        <div v-if="!isLoading">
          <fieldset>
            <div class="w-[calc(100%-40px)] mx-[auto] flex justify-between gap-[20px]">
              <div class="flex flex-col gap-[10px] w-[100%] max-w-[260px]">
                <label for="task-title" class="text-[#29A19C] font-bold text-[1.25rem]">Title</label>
                <input type="text" id="task-title" v-model="editingTask.title" placeholder="Title"
                  class="bg-[#2C3440] w-[100%] shadow-md py-[5px] px-[7px] rounded-md outline-none border-[1px] border-[#555C65] focus:shadow-[0px_0px_5px_black]"
                  required>
              </div>

              <div class="flex flex-col gap-[10px] w-[100%] max-w-[260px]">
                <label for="select-status" class="text-[#29A19C] font-bold text-[1.25rem]">Status</label>

                <select v-model="editingTask.status"
                  class="bg-[#2C3440] w-[100%] h-[36px] shadow-md py-[5px] px-[7px] rounded-md outline-none border-[1px] border-[#555C65] focus:shadow-[0px_0px_5px_black]">
                  <option disabled value="">Select one status</option>
                  <option value="to do">To Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              <div class="flex flex-col gap-[10px] w-[100%] max-w-[260px]">
                <label for="dueDate" class="text-[#29A19C] font-bold text-[1.25rem]">Due
                  Date</label>

                <input type="date" v-model="editingTask.dueDate" id="dueDate"
                  class="w-[100%] bg-[#2C3440] shadow-md py-[5px] px-[7px] rounded-md outline-none border-[1px] border-[#555C65] focus:shadow-[0px_0px_5px_black]">
              </div>
            </div>
            <div class="w-[calc(100%-40px)] mx-[auto] my-[20px] flex flex-col gap-[30px]">
              <div class="flex flex-col gap-[10px]">
                <label for="description" class="text-[#29A19C] font-bold text-[1.25rem]">Description</label>
                <textarea id="description" v-model="editingTask.description" placeholder="Task description"
                  class="h-[200px] bg-[#2C3440] shadow-md py-[5px] px-[7px] rounded-md outline-none border-[1px] border-[#555C65] focus:shadow-[0px_0px_5px_black]"></textarea>
              </div>
            </div>

          </fieldset>
        </div>
        <div v-else class="w-[calc(100%-40px)] mx-[auto] flex justify-between gap-[20px]">
          <p>Loading...</p>
        </div>
      </form>
    </TaskModal>
  </div>
</template>


<script setup lang="ts">
import moment from 'moment';
import { useTaskStore, type Task } from '~/stores/task'

type SwalIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

const isOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const emit = defineEmits(['handleListTasks'])

const props = defineProps<{ title: string, statusColor: string, tasks: Task[] }>()

const title = ref(props.title);
const statusColor = ref(props.statusColor);
const tasks = ref<Task[]>(props.tasks)
const editingTask = ref<Task>({
  uid: "",
  title: "",
  description: "",
  dueDate: new Date(),
  status: ""
})

const taskStore = useTaskStore()

const handleDeleteTask = async (taksUid: string, title: string) => {
  const alert = await showAlert(`Deseja excluir task: ${title}`, "question", true)
  if (alert.isConfirmed) {
    listTasks();
    const response = await taskStore.delete(taksUid)
    if (response.success) {
      showAlert(response.message, "success", false)
    } else {
      showAlert(response.message, "error", false)
    }
  }
}

const showEditModal = async (taskUid: string) => {
  isOpen.value = true;
  isLoading.value = true;
  const response = await taskStore.getByUid(taskUid)
  editingTask.value = response.task
  editingTask.value.dueDate = moment(response.task.dueDate).format("YYYY-MM-DD")
  isLoading.value = false;
}

const handleUpdateTask = async (taskUid?: string) => {
  const alert = await showAlert(`Deseja atualizar task: ${editingTask.value.title}`, "question", true)
  if (alert.isConfirmed && taskUid) {
    listTasks();
    const response = await taskStore.update(taskUid, editingTask.value)
    if (response.success) {
      showAlert(response.message, "success", false)
    } else {
      showAlert(response.message, "error", false)
    }
  }
}

const listTasks = () => {
  emit('handleListTasks')
}

const showAlert = async (title: string, icon: SwalIcon, denyButton: boolean) => {
  const { $swal } = useNuxtApp()

  const alert = await $swal.fire({
    title,
    icon,
    confirmButtonText: denyButton ? 'SIM' : 'OK',
    denyButtonText: 'NÃO',
    showDenyButton: denyButton,
    timer: denyButton ? undefined : 3000,
    background: "#111222",
  })

  return alert;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>