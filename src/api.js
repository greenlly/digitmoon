import axios from 'axios';


const token = localStorage.getItem("access_token");

const API = axios.create({
    baseURL: 'https://digitmoon.herokuapp.com/',
    // baseURL: 'http://127.0.0.1:8090/',
    // baseURL: 'https://cors-anywhere.herokuapp.com/https://api.minecrafty.tk/',
    headers: {
        Authorization: "Bearer " + token
    }
})

export default API;

