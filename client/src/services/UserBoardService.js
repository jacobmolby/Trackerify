import Api from '@/services/Api';

export default {
  post(payload) {
    return Api().post('/board/user', payload);
  },
  delete(userId, boardId) {
    return Api().delete(`/board/user/${userId}&${boardId}`);
  }
};
