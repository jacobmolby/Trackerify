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

      const listIndex = state.board.lists.findIndex(list => list._id == listId);

      state.board.lists[listIndex].cards.push(card);
    },
    removeCard(state, cardAndListId) {
      const { deletedCard, listId } = cardAndListId;

      const listIndex = state.board.lists.findIndex(list => list._id == listId);
      state.board.lists[listIndex].cards = state.board.lists[
        listIndex
      ].cards.filter(card => {
        return card._id !== deletedCard._id;
      });
    },
    removeList(state, deletedList) {
      state.board.lists = state.board.lists.filter(list => {
        return list._id !== deletedList._id;
      });
    },
    addComment(state, comment) {
      const listIndex = state.board.lists.findIndex(
        list => list._id == comment.listId
      );
      const cardIndex = state.board.lists[listIndex].cards.findIndex(
        card => card._id == comment.cardId
      );
      state.board.lists[listIndex].cards[cardIndex].comments.push(comment);
    },
    updateDescription(state, card) {
      const listIndex = state.board.lists.findIndex(
        list => list._id == card.list
      );
      const cardIndex = state.board.lists[listIndex].cards.findIndex(
        cardIterator => cardIterator._id == card._id
      );
      state.board.lists[listIndex].cards[cardIndex].description =
        card.description;
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
    },
    removeList({ commit }, deletedList) {
      commit('removeList', deletedList);
    },
    addComment({ commit }, comment) {
      commit('addComment', comment);
    },
    updateDescription({ commit }, card) {
      commit('updateDescription', card);
    }
  }
});
