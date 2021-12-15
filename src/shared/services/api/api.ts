import axios from 'axios';

const api = axios.create({
    baseURL: 'http://bet-management.herokuapp.com/api'
});


export { api };