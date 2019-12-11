import axios from 'axios';
import { store } from '@/store/store';

export default () => {
  return axios.create({
    baseURL: `http://192.168.1.14:8000/api`,
    timeout: 5000,
    //Assign the token, to use protected routes (every right now).
    headers: {
      'auth-token': store.state.token
    }
  });
};
