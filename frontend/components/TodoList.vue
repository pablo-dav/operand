<template>
    <div class="flex flex-col gap-[60px] pb-[20px]">

        <StatusTable title="To do" statusColor="bg-[#dc811a]" :tasks="filterList('to do')"
            @handleListTasks="handleListTasks" />

        <StatusTable title="In Progress" statusColor="bg-[#3f75db]" :tasks="filterList('in progress')"
            @handleListTasks="handleListTasks" />

        <StatusTable title="Done" statusColor="bg-[#51bb51]" :tasks="filterList('done')"
            @handleListTasks="handleListTasks" />

        <StatusTable title="Blocked" statusColor="bg-[#c1c104]" :tasks="filterList('blocked')"
            @handleListTasks="handleListTasks" />

        <StatusTable title="BackLog" statusColor="bg-[#111222]" :tasks="filterBacklog()"
            @handleListTasks="handleListTasks" />
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/stores/task'

const tasks = ref<{ uid: string, title: string, description: string, dueDate: Date, type: string, status: string }[]>([])

const taskStore = useTaskStore()

onMounted(async () => {
    handleListTasks();
});

const response = await taskStore.getAll();
tasks.value = response.tasks;
const handleListTasks = async () => {
    const response = await taskStore.getAll();
    tasks.value = response.tasks;
}

const filterList = (status: string) => {
    return tasks.value.filter(task => task.status.toUpperCase() === status.toUpperCase())
}

const filterBacklog = () => {
    return tasks.value.filter(task => !["TO DO", "IN PROGRESS", "DONE", "BLOCKED"].includes(task.status.toUpperCase()))
}
</script>
