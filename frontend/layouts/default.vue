<template>
    <div class="flex">
        <Head>
            <title>Task Manager</title>
        </Head>
        
        <SideNav />
        <div class="ml-[300px] w-[100%]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>