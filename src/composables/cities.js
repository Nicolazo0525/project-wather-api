import axios from "axios";
import { ref } from "vue";
import { useRoute } from 'vue-router';
import watherAxios from "../watherAxios";
import localAxios from "../localAxios";

export default function useCities(){
    
    const apiKey = '153a9c7aee2713af4d40b96156cac8e3';

    const city = ref([])
    const name = ref([])
    const cities = ref([])
    const citiesHistory = ref([])
    const metaCity = ref([])
    const humidity = ref([])

    const getCity = async (latitude, longitude) =>{
        let response = await watherAxios.get(`/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        name.value = response.data.name
        city.value = response.data.coord
        humidity.value = response.data.main
        /* console.log(city.value) */
    }
    
    const getCities = async () =>{
        let response = await watherAxios.get('/weather?q=miami&APPID='+apiKey)
        cities.value = response.data
        console.log(cities.value)
    }
    const storeCities = async (formData) =>{
        console.log(formData)
        let csrfCookie = await localAxios.get('/sanctum/csrf-cookie');
        let response = await localAxios.post('/api/cities/', formData, csrfCookie,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    }
    const getCitiesHistory = async (page) =>{
        let response = await localAxios.get('/api/cities?page='+page)
        citiesHistory.value = response.data
        metaCity.value = response.data.meta
        console.log(citiesHistory.value)
    }

    return{
        city,
        name,
        humidity,
        cities,
        metaCity,
        citiesHistory,
        getCity,
        storeCities,
        getCities,
        getCitiesHistory
    }
}
