import axios from 'axios';
import { store } from '@/store/';
// import { API_URL } from '../config';

const API_URL = process.env.API_URL || 'http://localhost:8000';

export default () => {
  return axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 5000,
    //Assign the token, to use protected routes (every right now).
    headers: {
      Authorization: 'Bearer ' + store.state.token
    }
  });
};
