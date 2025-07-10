import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5220/api', // Cambia al puerto correcto
});

export default api;