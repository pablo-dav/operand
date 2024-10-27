<template>
    <aside class="bg-[#181c23] fixed shadow-lg shadow-black w-[100%] h-[100vh] max-w-[300px] backdrop-blur opacity-[1] flex">
        <div class="w-[100%] mx-[auto] pt-[20px] flex flex-col">
            <div class="px-[20px] pb-[60px] flex items-center gap-[20px]">
                <img src="@/assets/img/new-logo.png" alt="">
                <h2 class="text-[#4CCFF1] hover:scale-105 transition-transform duration-300 uppercase font-bold text-[20px] leading-[26px]">Task<br> <span class="text-[white]">Manager</span></h2>
            </div>

            <nav class="mt-[60px]">
                <div>
                    <h3 class="pl-[20px] mb-[20px] text-[24px] text-[#4CCFF1]">My Workspace</h3>
                    <ul class="flex flex-col">
                        <li>
                            <NuxtLink to="#" class="text-[white] text-[18px] transition-all duration-[0.3s] hover:bg-[#3294b8] w-[100%] pl-[40px] py-[15px] flex gap-[20px]">
                                <img src="@/assets/img/dashboard-icon.svg" alt="Dashboard Icon" class="max-w-[20px]">
                                Dashboard
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="#" class="text-[white] text-[18px] transition-all duration-[0.3s] hover:bg-[#3294b8] w-[100%] pl-[40px] py-[15px] flex gap-[20px]">
                                <img src="@/assets/img/profile-icon.svg" alt="Profile Icon" class="max-w-[20px]">
                                My Profile
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div class="w-[100%] pb-[20px] mt-[auto]">
                <NuxtLink href="#" class="text-[white] hover:bg-[#3294b8] transition-all duration-[0.3s] w-[100%] pl-[20px] py-[15px] flex gap-[20px]">
                    <img class="max-w-[20px]" src="@/assets/img/logout-icon.svg" alt="">
                    Logout
                </NuxtLink>
            </div>
        </div>
    </aside>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {

        }
    },
    methods: {
        
    }
}
</script>