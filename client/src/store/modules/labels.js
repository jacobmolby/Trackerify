export default {
  mutations: {
    addLabelToBoard(localState, label) {
      //Using this.state to access the store
      this.state.board.labels.push(label);
    },
    removeLabelFromBoard(localState, labelId) {
      //Using this.state to access the store
      this.state.board.labels = this.state.board.labels.filter(
        label => label._id !== labelId
      );
    }
  },
  actions: {
    addLabelToBoard({ commit }, label) {
      commit('addLabelToBoard', label);
    },
    removeLabelFromBoard({ commit }, labelId) {
      commit('removeLabelFromBoard', labelId);
    }
  }
};
