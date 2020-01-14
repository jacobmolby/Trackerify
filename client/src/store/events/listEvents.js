import ListService from '../../services/ListService';
import ListOrderService from '../../services/ListOrderService';

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
    },
    async addList({ commit }, list) {
      commit('addList', list);
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
