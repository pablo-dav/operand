<template>
    <transition name="fade">
        <form v-if="isOpen" @submit.prevent="checkButton(props.action)">
            <div @click.self="closeModal">
                <div @click="closeModal" class="fixed bg-[#00000068] w-[100%] h-[100%] top-0 left-0 z-20">
                </div>

                <div
                    class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-[20px] bg-[#181C23] w-[calc(100%-40px)] max-w-[1200px] z-[30] rounded-xl shadow-[0px_0px_20px_black]">
                    <slot></slot>
                    <div v-if="action != 'view'" class="flex justify-end gap-[15px] w-[calc(100%-20px)]">
                        <button type="button" @click="closeModal"
                            class="bg-[#828282] hover:bg-[#8c8c8c] uppercase px-[10px] py-[5px] text-[14px] rounded-[5px]">Cancel</button>
                        <button type="submit"
                            class="bg-[#29A19C] hover:bg-[#2db1ac] uppercase px-[10px] py-[5px] text-[14px] rounded-[5px]">
                            {{ props.action }} task
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </transition>
</template>
<script setup lang="ts">

const props = defineProps<{ isOpen: boolean, action: string }>()

const emit = defineEmits(['handleCreateNewTask', 'handleUpdateTask', 'update:isOpen'])

function closeModal() {
    emit('update:isOpen', false)
}

function checkButton(action: string) {
    if (action == "create") {
        return createTask();
    } else {
        return updateTask();
    }
}

function createTask() {
    emit('handleCreateNewTask')
}

function updateTask() {
    emit('handleUpdateTask')
}
</script>