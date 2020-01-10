import Api from '@/services/Api';

export default {
  //Payload contains title,color and boardId
  post(payload) {
    return Api().post('/label', payload);
  },
  delete({ boardId, labelId }) {
    return Api().delete(`/label/${boardId}&${labelId}`);
  },
  put(payload) {
    return Api().put(`/label/`, payload);
  }
};
