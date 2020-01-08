export default {
  mutations: {
    updateListTitle(localState, list) {
      const { listTitle, listId } = list;
      //Using this.state to access the store
      this.state.board.lists.find(
        list => list._id === listId
      ).title = listTitle;
    }
  },
  actions: {
    updateListTitle({ commit }, list) {
      commit('updateListTitle', list);
    }
  }
};
