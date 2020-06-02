import axios from 'axios';

export const todo = axios.create({
    // baseURL: "http://localhost:8000/",
    baseURL: "https://todo-tracker-backend.herokuapp.com/",
    headers: {
        'Content-Type': 'application/json'
    }
})