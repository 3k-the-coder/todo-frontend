import axios from 'axios';
import CONFIG from './../config';


export const todo = axios.create({
    baseURL: CONFIG.baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})