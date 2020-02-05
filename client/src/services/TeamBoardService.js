import Api from '@/services/Api';

export default {
  post(payload) {
    return Api().post('/team/board', payload);
  },
  delete({ teamId, boardId }) {
    return Api().delete(`/team/board/${teamId}&${boardId}`);
  }
};
