import Api from '@/services/Api';

export default {
  get(searchQuery) {
    return Api().get(`/board/search/?board=${searchQuery}`);
  }
};
