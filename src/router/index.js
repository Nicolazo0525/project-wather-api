import { createRouter, createWebHistory } from "vue-router";

import IndexCities from '../components/weather/Index.vue'
import City from '../components/weather/City.vue'
import CityHistory from '../components/weather/CityHistory.vue'

const routes = [
    {
        path: "/cities/",
        name: "cities.index",
        component: IndexCities
    },
    {
        path: "/city/:city",
        name: "City",
        component: City,
        props: true
    },
    {
        path: "/cities-history/",
        name: "CityHistory",
        component: CityHistory
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})