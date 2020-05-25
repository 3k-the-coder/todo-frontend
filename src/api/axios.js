import axios from 'axios';

export const todo = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        'Content-Type': 'application/json'
    }
})