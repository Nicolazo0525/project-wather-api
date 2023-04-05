<script setup>
import { onMounted, ref } from 'vue'
import useCities from '../../composables/cities'
import Paginate from "vuejs-paginate-next";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import localAxios from '../../localAxios';

const {citiesHistory, metaCity, getCitiesHistory, deleteCity} = useCities()

const page = ref(1);

onMounted(()=>{
    getCitiesHistory(page.value)
})
</script>
    
<template>
    <div class="w-11/12 mx-auto rounded-md shadow-md bg-white my-12 p-6  flex justify-start space-y-3 flex-col">
        <div class="text-xl font-bold">History</div>
        <div class="overflow-x-auto rounded-lg border shadow-md">
            <table class="min-w-full rounded-md leading-normal">
                <thead>
                    <tr>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-left bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Id
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Latitude
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            longitude
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Accions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="citiesHistory.data">
                        <template v-for="city in citiesHistory.data" :key="city.id">
                            <tr>
                                <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="items-center">
                                        <div class=" text-gray-900 whitespace-no-wrap">
                                            {{ city.id }}
                                        </div>
                                    </div>
                                </td>
                                <td class="w-2/5 px-3 py-3 text-center text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="items-center">
                                        <div class=" text-gray-900 whitespace-no-wrap">
                                            {{ city.name }}
                                        </div>
                                    </div>
                                </td>
                                <td class="w-2/5 px-3 py-3 text-center text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="flex justify-center items-center ju">
                                        <div class=" text-gray-900 whitespace-no-wrap text-center">
                                            {{ city.latitude }}
                                        </div>
                                    </div>
                                </td>
                                <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="flex justify-center items-center">
                                        <div class=" text-gray-900 whitespace-no-wrap text-center">
                                            {{ city.longitude }}
                                        </div>
                                    </div>
                                </td>
                                <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="flex justify-center items-center">
                                        <div class=" text-gray-900 whitespace-no-wrap text-center">
                                            <template v-if="city.status == 1">
                                                <span
                                                    class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                                                >
                                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                                    Active
                                                </span>
                                            </template>
                                            <template v-if="city.status == 0">
                                                <span
                                                    class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                                                >
                                                    <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                                    Active
                                                </span>
                                            </template>
                                        </div>
                                    </div>
                                </td>
                                <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                    <div class="flex justify-center items-center">
                                        <button class="text-center rounded-2xl" @click="deleteCity(city.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                              </svg>
                                              
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </template>
                    <div class=" col-span-6">
                        <template v-if="!citiesHistory.data">
                            <div class="text-center">No data</div>
                        </template>
                    </div>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center">
            <v-pagination
                v-model="page"
                :pages="metaCity.last_page"
                :range-size="5"
                active-color="rgba(59, 130, 246, var(--tw-bg-opacity))"
                @update:modelValue="getCitiesHistory"
            />
        </div>
        
    </div>
</template>

<style>

</style>