<script setup>
import { onMounted, ref } from 'vue'
import useCities from '../../composables/cities'
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer,LMarker } from "@vue-leaflet/vue-leaflet";
import L from 'leaflet'

const zoom = 8
const showMap = ref(false);

const {city, name, humidity, getCity, storeCities} = useCities()
const formData = new FormData();

const props = defineProps({
    city:{
        type:String
    }
})

const cityId = ref(props.city)

const miami = ref('')
const orlando = ref('')
const newYork = ref('')
const latitude = ref('')
const longitude = ref('')
const status = ref(1)

const markerLatLng = ref()


const latitudeHistory = ref('')
const longitudeHistory = ref('')

if (props.city == 1) {
    latitude.value = 25.7743
    longitude.value = -80.1937
    markerLatLng.value = [latitude.value, longitude.value]
    console.log(markerLatLng.value)
    onMounted(()=>{
        getCity(latitude.value, longitude.value)
    })
    
}

//Orlando
if (props.city == 2) {
    latitude.value = 28.5383
    longitude.value = -81.3792
    markerLatLng.value = [latitude.value, longitude.value]
    onMounted(()=>{
        getCity(latitude.value, longitude.value)
    })
}
//New York
if (props.city == 3) {
    latitude.value = 40.7143
    longitude.value = -74.006
    markerLatLng.value = [latitude.value, longitude.value]
    onMounted(()=>{
        getCity(latitude.value, longitude.value)
    })
}

const createCityHistory = async () =>{
    formData.append('name',name.value);
    formData.append('latitude',latitude.value);
    formData.append('longitude',longitude.value);
    formData.append('status',status.value);
    
    for (const [key, value] of formData) {
        formData[key] = value
    }
    await storeCities({...formData})
}

</script>
<template>
    <div class="w-11/12 mx-auto rounded-md shadow-md bg-white my-12 p-6  flex justify-start space-y-3 flex-col">
        <template v-if="cityId == 1">
            <div class="text-center text-2xl font-bold uppercase">{{ name }}</div>
            <div class="text-justify">
                {{ name }} is a port city located in southeastern Florida, United States, around the Miami River, between the Everglades and the Atlantic Ocean. 
                {{ name }}'s latitude is {{ latitude }} and longitude is {{ longitude }}.
            </div>
            <div class="flex flex-row gap-1 items-center">
                <div class="text-justify">
                    {{ name }}'s humidity is: 
                </div>
                <div class="text-justify text-lg rounded-md bg-green-100 text-green-700 w-12 flex justify-center border border-green-700 shadow-md items-center">
                    <div>
                        {{ humidity.humidity }}
                    </div>
                </div>
            </div>
            <form action="" @submit.prevent="createCityHistory()">
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Author" v-model="name"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Editorial" v-model="latitude"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Edition" v-model="longitude"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Pages" v-model="status"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <button @click="showMap = !showMap" class="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    {{ showMap ? 'Ocultar ubicación' : 'Mostrar ubicación' }}
                </button>
            </form>
            <div class="rounded-lg flex justify-center">
                <div v-if="showMap" class="w-[25em] h-[20em] md:w-[25em] md:h-[20em] lg:w-[25em] lg:h-[20em]">
                    <l-map  v-model:zoom="zoom" :center="[city.lat, city.lon]">
                        <l-tile-layer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        layer-type="base"
                        name="OpenStreetMap"
                        ></l-tile-layer>
                        <l-marker :lat-lng="markerLatLng"></l-marker>
                    </l-map>
                </div>
            </div>
        </template>
        <template v-if="cityId == 2">
            <div class="text-center text-2xl font-bold uppercase">{{ name }}</div>
            <div class="text-justify">
                The city of {{ name }} is the county seat of Orange County and is the central city of the metropolitan area of the same name, as well as the head of the region known as Central Florida, in the state of Florida, in the southeastern United States.
                {{ name }}'s latitude is {{ latitude }} and longitude is {{ longitude }}.
                
            </div>
            <div class="flex flex-row gap-1 items-center">
                <div class="text-justify">
                    {{ name }}'s humidity is: 
                </div>
                <div class="text-justify text-lg rounded-md bg-green-100 text-green-700 w-12 flex justify-center border border-green-700 shadow-md items-center">
                    <div>
                        {{ humidity.humidity }}
                    </div>
                </div>
            </div>
            
            <form action="" @submit.prevent="createCityHistory()">
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Author" v-model="name"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Editorial" v-model="latitude"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Edition" v-model="longitude"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Pages" v-model="status"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <button @click="showMap = !showMap" class="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    {{ showMap ? 'Ocultar ubicación' : 'Mostrar ubicación' }}
                </button>
            </form>
            <div class="flex justify-center ">
                <div v-if="showMap" class="w-[25em] h-[20em] md:w-[25em] md:h-[20em] lg:w-[25em] lg:h-[20em]">
                    <l-map  v-model:zoom="zoom" :center="[city.lat, city.lon]">
                        <l-tile-layer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        layer-type="base"
                        name="OpenStreetMap"
                        ></l-tile-layer>
                        <l-marker :lat-lng="markerLatLng"></l-marker>
                    </l-map>
                </div>
            </div>
        </template>
        <template v-if="cityId == 3">
            <div class="text-center text-2xl font-bold uppercase">{{ name }}</div>
            <div class="text-justify">
                {{ name }} is the most populated city in the United States of America and one of the most populated cities in the world, with an urban area of 24 million inhabitants.
                {{ name }}'s latitude is {{ latitude }} and longitude is {{ longitude }}.
            </div>
            <div class="flex flex-row gap-1 items-center">
                <div class="text-justify">
                    {{ name }}'s humidity is: 
                </div>
                <div class="text-justify text-lg rounded-md bg-green-100 text-green-700 w-12 flex justify-center border border-green-700 shadow-md items-center">
                    <div>
                        {{ humidity.humidity }}
                    </div>
                </div>
            </div>
            <form action="" @submit.prevent="createCityHistory()">
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Author" v-model="name"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Editorial" v-model="latitude"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Edition" v-model="longitude"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Pages" v-model="status"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <button @click="showMap = !showMap" class="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    {{ showMap ? 'Ocultar ubicación' : 'Mostrar ubicación' }}
                </button>
            </form>
            <div class="rounded-lg flex justify-center">
                <div v-if="showMap" class="w-[25em] h-[20em] md:w-[25em] md:h-[20em] lg:w-[25em] lg:h-[20em]">
                    <l-map  v-model:zoom="zoom" :center="[city.lat, city.lon]">
                        <l-tile-layer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        layer-type="base"
                        name="OpenStreetMap"
                        ></l-tile-layer>
                        <l-marker :lat-lng="markerLatLng"></l-marker>
                    </l-map>
                </div>
            </div>
        </template>
    </div>
</template>
    

<style>

</style>