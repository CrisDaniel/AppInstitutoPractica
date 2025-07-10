import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7026/api/Cursos', // Cambia al puerto correcto
});

export default api;