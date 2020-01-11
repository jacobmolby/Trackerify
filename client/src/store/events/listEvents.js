import ListService from '../../services/ListService';

export default {
  mutations: {
    updateListTitle(state, list) {
      const { listTitle, listId } = list;
      state.board.lists.find(list => list._id === listId).title = listTitle;
    }
  },
  actions: {
    async updateListTitle({ commit }, payload) {
      await ListService.put(payload);
      commit('updateListTitle', payload);
    }
  }
};
