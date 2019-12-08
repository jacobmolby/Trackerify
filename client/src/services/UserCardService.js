import Api from '@/services/Api';

export default {
  post(payload) {
    return Api().post('/card/user', payload);
  },
  delete(userId, cardId) {
    return Api().delete(`/card/user/${userId}&${cardId}`);
  }
};
