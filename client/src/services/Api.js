import axios from 'axios';
import { store } from '@/store/store';

export default () => {
  return axios.create({
    baseURL: `http://localhost:8000/api`,
    timeout: 5000,
    //Assign the token, to use protected routes (i.g. /course).
    headers: {
      'auth-token': store.state.token
    }
  });
};
