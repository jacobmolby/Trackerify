import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    isBoardLoggedIn: false,
    board: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setBoard(state, board) {
      state.board = board;
    },
    addList(state, list) {
      state.board.lists.push(list);
    },
    addCard(state, cardAndListId) {
      const { card, listId } = cardAndListId;

      let listIndex = state.board.lists.findIndex(list => list._id == listId);

      state.board.lists[listIndex].cards.push(card);
    },
    removeCard(state, cardAndListId) {
      const { deletedCard, listId } = cardAndListId;

      let listIndex = state.board.lists.findIndex(list => list._id == listId);
      state.board.lists[listIndex].cards = state.board.lists[
        listIndex
      ].cards.filter(card => {
        return card._id !== deletedCard._id;
      });
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setBoard({ commit }, board) {
      commit('setBoard', board);
    },
    addList({ commit }, list) {
      commit('addList', list);
    },
    addCard({ commit }, cardAndListId) {
      commit('addCard', cardAndListId);
    },
    removeCard({ commit }, cardAndListId) {
      commit('removeCard', cardAndListId);
    }
  }
});
