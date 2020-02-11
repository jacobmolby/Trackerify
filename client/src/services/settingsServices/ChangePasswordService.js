import Api from '@/services/Api';

export default {
  put(payload) {
    return Api().put('user/password', payload);
  }
};
