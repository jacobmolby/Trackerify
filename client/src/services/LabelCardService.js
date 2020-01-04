import Api from '@/services/Api';

export default {
  //Payload contains title,color and boardId
  post(cardId, labelId) {
    return Api().post('/label/card', { cardId, labelId });
  },
  delete(cardId, labelId) {
    return Api().delete(`/label/card/${cardId}&${labelId}`);
  }
};
