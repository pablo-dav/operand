<template>
    <main class="w-[100%] pt-[20px]">
        <div class="w-[calc(100%-40px)] mx-[auto]">
            <header class="flex justify-between items-center">
                <button @click="isOpen = true"
                    class="w-[100%] max-w-[190px] py-[10px] shadow-xl bg-[#3090a9] hover:bg-[#4CCFF1] transition-all duration-200 rounded-lg flex items-center justify-center gap-[10px]">
                    <img src="@/assets/img/plus.svg" alt="Plus Icon">
                    Create new Task
                </button>

                <div class="w-[100%] max-w-[350px] px-[20px] py-[15px] flex items-center gap-[20px]">
                    <div class="">
                        {{ authStore.user?.name || authStore.user?.email }}
                    </div>

                    <div class="flex items-center gap-[15px]">
                        <div class="w-[50px] h-[50px] border-[2px] border-[#4c5b5a] rounded-[100%] overflow-hidden">
                            <img class="w-[100%] object-cover" src="@/assets/img/profile-pic.png" alt="Profile pic">
                        </div>
                    </div>

                    <div class="flex items-center">
                        <button
                            class="w-[100%] max-w-[290px] p-[10px] shadow-xl bg-[#181c23] hover:bg-[#111222] transition-all duration-200 rounded-lg flex items-center justify-center gap-[10px]"
                            @click="authStore.logout">Logout</button>
                    </div>
                </div>
            </header>

            <div class="mt-[100px]">
                <TodoList ref="handleListTasks" />
            </div>

            <TaskModal v-model:isOpen="isOpen" action="create" @handleCreateNewTask="handleCreateNewTask">
                <h2 class="px-[20px] mb-[30px] text-[1.875rem]">Criar nova task</h2>

                <div v-if="!isLoading">
                    <fieldset>
                        <div class="w-[calc(100%-40px)] mx-[auto] flex justify-between gap-[20px]">
                            <div class="flex flex-col gap-[10px] w-[100%] max-w-[260px]">
                                <label for="task-title" class="text-[#29A19C] font-bold text-[1.25rem]">Title</label>
                                <input type="text" id="task-title" v-model="task.title" placeholder="Title"
                                    class="bg-[#2C3440] w-[100%] shadow-md py-[5px] px-[7px] rounded-md outline-none border-[1px] border-[#555C65] focus:shadow-[0px_0px_5px_black]"
                                    required>
                            </div>

                            <div class="flex flex-col gap-[10px] w-[100%] max-w-[260px]">
                                <label for="select-status"
                                    class="text-[#29A19C] font-bold text-[1.25rem]">Status</label>

                                <select v-model="task.status"
                                    class="bg-[#2C3440] w-[100%] h-[36px] shadow-md py-[5px] px-[7px] rounded-md outline-none border-[1px] border-[#555C65] focus:shadow-[0px_0px_5px_black]">
                                    <option selected disabled value="">Select one status</option>
                                    <option value="to do">To Do</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="done">Done</option>
                                    <option value="blocked">Blocked</option>
                                </select>
                            </div>

                            <div class="flex flex-col gap-[10px] w-[100%] max-w-[260px]">
                                <label for="dueDate" class="text-[#29A19C] font-bold text-[1.25rem]">Due
                                    Date</label>

                                <input type="date" v-model="task.dueDate" id="dueDate"
                                    class="w-[100%] bg-[#2C3440] shadow-md py-[5px] px-[7px] rounded-md outline-none border-[1px] border-[#555C65] focus:shadow-[0px_0px_5px_black]">
                            </div>
                        </div>
                        <div class="w-[calc(100%-40px)] mx-[auto] my-[20px] flex flex-col gap-[30px]">
                            <div class="flex flex-col gap-[10px]">
                                <label for="description"
                                    class="text-[#29A19C] font-bold text-[1.25rem]">Description</label>
                                <textarea id="description" v-model="task.description" placeholder="Task description"
                                    class="h-[200px] bg-[#2C3440] shadow-md py-[5px] px-[7px] rounded-md outline-none border-[1px] border-[#555C65] focus:shadow-[0px_0px_5px_black]"></textarea>
                            </div>
                        </div>

                    </fieldset>
                </div>
                <div v-else class="w-[calc(100%-40px)] mx-[auto] flex justify-between gap-[20px]">
                    <Loading />
                </div>
            </TaskModal>

        </div>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useTaskStore, type TaskSavePayload } from '~/stores/task'
import authMiddleware from '~/middleware/auth.client'

definePageMeta({
    middleware: authMiddleware
})

type SwalIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

const task = ref<TaskSavePayload>({
    title: "",
    description: "",
    dueDate: new Date(),
    status: ""
})
const handleListTasks = ref<{ handleListTasks: () => void } | null>(null);

const authStore = useAuthStore()
const taskStore = useTaskStore()

const isOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const handleCreateNewTask = async () => {
    isLoading.value = true
    const response = await taskStore.create(task.value)

    handleListTasks.value?.handleListTasks()
    isLoading.value = false
    if (response.success) {
        showAlert(response.message, "success")
    } else {
        showAlert(response.message, "error")
    }
}

const showAlert = (title: string, icon: SwalIcon) => {
    const { $swal } = useNuxtApp()

    isOpen.value = false;
    $swal.fire({
        title,
        icon,
        confirmButtonText: 'OK',
        timer: 3000,
        color: "#3090a9"
    })
}

</script>