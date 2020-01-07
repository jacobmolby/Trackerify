export default {
  mutations: {
    setBoardOverview(localState, boards) {
      //Using this.state to access the store
      this.state.user.boards = boards;
    }
  },
  actions: {
    setBoardOverview({ commit }, boards) {
      commit('setBoardOverview', boards);
    }
  }
};
