import Router from '../../router';

export default {
  state: {
    isConnected: false
  },
  mutations: {
    SOCKET_CONNECT(state) {
      state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    }
  },
  actions: {
    SOCKET_CONNECT({ commit }) {
      commit('SOCKET_CONNECT');
    },

    SOCKET_DISCONNECT({ commit }) {
      commit('SOCKET_DISCONNECT');
    },
    SOCKET_updateBoard({ commit }, board) {
      commit('updateBoard', board, { root: true });
    },
    SOCKET_updateCardOrder({ commit }, list) {
      commit('updateCardOrder', list, { root: true });
    },
    SOCKET_updateListOrder({ commit }, lists) {
      commit('updateListOrder', lists, { root: true });
    },
    SOCKET_deleteBoard({ commit }, payload) {
      commit('deleteBoard', payload, { root: true });
    },
    SOCKET_addList({ commit }, list) {
      commit('addList', list, { root: true });
    },
    SOCKET_addCard({ commit }, card) {
      commit('addCard', card, { root: true });
    },
    SOCKET_removeCard({ commit }, deletedCard) {
      commit('removeCard', deletedCard, { root: true });
    },
    SOCKET_removeList({ commit }, deletedList) {
      commit('removeList', deletedList, { root: true });
    },
    SOCKET_addComment({ commit }, comment) {
      commit('addComment', comment, { root: true });
    },
    SOCKET_updateCard({ commit }, card) {
      commit('updateCard', card, { root: true });
    },
    SOCKET_addUserToBoard({ commit }, payload) {
      commit('addUserToBoard', payload, { root: true });
    },
    SOCKET_addUserToCard({ commit }, payload) {
      commit('addUserToCard', payload, { root: true });
    },
    SOCKET_removeUserFromBoard({ commit }, userId) {
      commit('removeUserFromBoard', userId, { root: true });
    },
    SOCKET_removeUserFromCard({ commit }, payload) {
      commit('removeUserFromCard', payload, { root: true });
    },
    SOCKET_addLabelToBoard({ commit }, payload) {
      commit('addLabelToBoard', payload, { root: true });
    },
    SOCKET_removeLabelFromBoard({ commit }, labelId) {
      commit('removeLabelFromBoard', labelId, { root: true });
    },
    SOCKET_addLabelToCard({ commit }, payload) {
      commit('addLabelToCard', payload, { root: true });
    },
    SOCKET_removeLabelFromCard({ commit }, payload) {
      commit('removeLabelFromCard', payload, { root: true });
    },

    SOCKET_updateLabel({ commit }, payload) {
      commit('updateLabel', payload, { root: true });
    },
    SOCKET_removeCommentFromCard({ commit }, payload) {
      commit('removeCommentFromCard', payload, { root: true });
    },
    SOCKET_updateListTitle({ commit }, payload) {
      commit('updateListTitle', payload, { root: true });
    }
  }
};
