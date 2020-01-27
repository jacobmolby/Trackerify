import Api from '@/services/Api';

export default {
  post(payload) {
    return Api().post('/team/user', payload);
  }
};
