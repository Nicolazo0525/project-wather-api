<script setup>
import { onMounted,ref } from 'vue';
import useCities from '../../composables/cities';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

const zoom = 10
const showMap = ref(false);
const showModal = ref(false);
const selectedCity = ref('')
const {cities, getCities} = useCities()

onMounted(() => {
  getCities()
})
</script>

<template>
    <div class="w-11/12 mx-auto rounded-md shadow-md bg-white my-12 p-6 ">
        <div class="text-center text-2xl font-bold uppercase">Cities</div>
        <div class="text-center mt-2">
            Please, press the button with the city you want to consult.
        </div>
        <div class="items-center flex flex-col md:flex-row justify-between mt-6 space-y-8 md:space-y-0">
            <div class="items-center">
                <router-link :to="{name: 'City', params:{city:1}}" class="w-full rounded-2xl border-b-4 px-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Miami</router-link>
            </div>
            <div class="items-center">
                <router-link :to="{name: 'City', params:{city:2}}" class="w-full rounded-2xl border-b-4 px-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Orlando</router-link>
            </div>
            <div class="items-center">
                <router-link :to="{name: 'City', params:{city:3}}" class="w-full rounded-2xl border-b-4 px-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">New York</router-link>
            </div>
        </div>
        
    </div>  
</template>


<style>

</style>