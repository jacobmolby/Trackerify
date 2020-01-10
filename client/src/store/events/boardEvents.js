import BoardService from '../../services/BoardService';

export default {
  mutations: {
    setBoardOverview(state, boards) {
      state.user.boards = boards;
    }
  },
  actions: {
    async setBoardOverview({ commit }) {
      const boards = (await BoardService.index()).data;
      commit('setBoardOverview', boards);
    }
  }
};
