import Api from '@/services/Api';

export default {
  post(payload) {
    return Api().post('/team', payload);
  },
  get() {
    return Api().get('/team');
  }
};
