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
        let response = await watherAxios.get(`/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`)
        name.value = response.data.name
        city.value = response.data.coord
        humidity.value = response.data.main
    }
    
    const getCities = async () =>{
        let response = await watherAxios.get('/weather?q=miami&APPID='+apiKey)
        cities.value = response.data
    }
    const storeCities = async (formData) =>{
        let csrfCookie = await localAxios.get('/sanctum/csrf-cookie');
        let response = await localAxios.post('/api/cities/', formData, csrfCookie)
    }
    const getCitiesHistory = async (page) =>{
        let response = await localAxios.get('/api/cities?page='+page)
        citiesHistory.value = response.data
        metaCity.value = response.data.meta
    }

    const deleteCity = async(id) =>{
        let response = await localAxios.delete('/api/cities/' + id)
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
        getCitiesHistory,
        deleteCity
    }
}
