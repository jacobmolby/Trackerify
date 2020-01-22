import Api from '@/services/Api';

export default {
  post(payload) {
    return Api().post('card/archive', payload);
  },
  delete({ cardId }) {
    return Api().delete(`card/archive/${cardId}`);
  }
};
