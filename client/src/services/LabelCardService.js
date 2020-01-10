import Api from '@/services/Api';

export default {
  //Payload contains title,color and boardId
  post(payload) {
    return Api().post('/label/card', payload);
  },
  delete({ cardId, labelId }) {
    return Api().delete(`/label/card/${cardId}&${labelId}`);
  }
};
