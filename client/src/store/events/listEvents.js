import ListService from '../../services/ListService';
import ListOrderService from '../../services/ListOrderService';

export default {
  mutations: {
    updateListTitle(state, list) {
      const { listTitle, listId } = list;
      state.board.lists.find(list => list._id === listId).title = listTitle;
    },
    addList(state, list) {
      state.board.lists.push(list);
    },

    removeList(state, deletedList) {
      state.board.lists = state.board.lists.filter(list => {
        return list._id !== deletedList._id;
      });
    },
    updateListOrder(state, { lists }) {
      state.board.lists = lists;
    }
  },
  actions: {
    async updateListTitle({ commit }, payload) {
      await ListService.put(payload);
      commit('updateListTitle', payload);
    },
    async addList({ commit }, payload) {
      const response = (await ListService.post(payload)).data;

      commit('addList', response);
      commit('addListIsOpen', false);
    },
    async removeList({ commit }, { listId }) {
      const deletedList = (await ListService.delete(listId)).data;
      commit('removeList', deletedList);
    },
    async updateListOrder({ commit }, { boardId, lists }) {
      const listIds = lists.map(list => list._id);
      await ListOrderService.put({ listIds, boardId }).data;

      commit('updateListOrder', { lists });
    }
  }
};
