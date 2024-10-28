<template>
    <div class="flex flex-col gap-[60px] pb-[20px]">
        <StatusTable :isLoading title="To do" statusColor="bg-[#dc811a]" :tasks="filterToDo"
            @handleListTasks="handleListTasks" />

        <StatusTable :isLoading title="In Progress" statusColor="bg-[#3f75db]" :tasks="filterInProgress"
            @handleListTasks="handleListTasks" />

        <StatusTable :isLoading title="Done" statusColor="bg-[#51bb51]" :tasks="filterDone"
            @handleListTasks="handleListTasks" />

        <StatusTable :isLoading title="Blocked" statusColor="bg-[#c1c104]" :tasks="filterBlocked"
            @handleListTasks="handleListTasks" />

        <StatusTable :isLoading title="BackLog" statusColor="bg-[#111222]" :tasks="filterBacklog"
            @handleListTasks="handleListTasks" />
    </div>
</template>

<script setup lang="ts">
import { showAlert } from '~/plugins/sweetalert2.client';
import { useTaskStore, type Task } from '~/stores/task'

const tasks = ref<Task[]>([])
const isLoading = ref<boolean>(false)

const taskStore = useTaskStore()

onMounted(async () => {
    await handleListTasks()
});

const handleListTasks = async (taskFilter?: string) => {
    isLoading.value = true;
    let response = null
    if (!taskFilter || taskFilter == "") {
        response = await taskStore.getAll();
    } else {
        response = await taskStore.search(taskFilter);
        if (response.success) {
            tasks.value = response.tasks;
        } else {
            showAlert(response.message, "error", false)
            response.tasks = [];
        }
    }
    tasks.value = response.tasks;
    isLoading.value = false;
}

const filterToDo = computed(() => {
    return tasks.value.filter(task => task.status.toUpperCase() === "TO DO")
})

const filterInProgress = computed(() => {
    return tasks.value.filter(task => task.status.toUpperCase() === "IN PROGRESS")
})

const filterDone = computed(() => {
    return tasks.value.filter(task => task.status.toUpperCase() === "DONE")
})

const filterBlocked = computed(() => {
    return tasks.value.filter(task => task.status.toUpperCase() === "BLOCKED")
})

const filterBacklog = computed(() => {
    return tasks.value.filter(task => !["TO DO", "IN PROGRESS", "DONE", "BLOCKED"].includes(task.status.toUpperCase()))
})

defineExpose({
    handleListTasks
});;
</script>
