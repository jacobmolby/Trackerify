import Api from '@/services/Api';

export default {
  index() {
    return Api().get('board');
  },

  show(boardId) {
    return Api().get(`board/${boardId}`);
  },
  post(payload) {
    return Api().post(`board/`, payload);
  },
  update(payload) {
    return Api().put(`board/`, payload);
  },
  delete(boardId) {
    return Api().delete(`board/${boardId}`);
  }
};
