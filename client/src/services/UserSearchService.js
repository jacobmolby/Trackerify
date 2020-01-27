import Api from '@/services/Api';

export default {
  get(searchQuery) {
    return Api().get(`/user/search/?user=${searchQuery}`);
  }
};
