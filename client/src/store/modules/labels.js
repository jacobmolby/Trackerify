export default {
  mutations: {
    addLabelToBoard(localState, label) {
      //Using this.state to access the store
      this.state.board.labels.push(label);
    }
  },
  actions: {
    addLabelToBoard({ commit }, label) {
      commit('addLabelToBoard', label);
    }
  }
};
