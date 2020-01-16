import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import webSocketPlugin from './plugins/websocketPlugin';

import socketio from './modules/socketio';
import label from './events/labelEvents';
import comment from './events/commentEvents';
import board from './events/boardEvents';
import list from './events/listEvents';
import card from './events/cardEvents';

import AuthenticationService from '../services/AuthenticationService';

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer: ({ token, user, isUserLoggedIn }) => ({
        token,
        user,
        isUserLoggedIn
      })
    }),
    webSocketPlugin
  ],
  modules: {
    socketio
  },
  state: {
    token: null,
    user: { boards: null },
    isUserLoggedIn: false,
    board: { _id: null, lists: [{ cards: [{}] }] },
    isLoading: false
  },
  getters: {
    getCardsByListId: state => listId => {
      return state.board.lists.find(list => list._id === listId).cards;
    },
    getCardById: state => cardId => {
      let cardById = {};
      state.board.lists.forEach(list =>
        list.cards.forEach(card => {
          if (card._id === cardId) {
            cardById = card;
          }
        })
      );
      return cardById;
    },
    numberOfAllCards(state) {
      if (state.isLoading) return 0;
      let numberOfCards = 0;
      state.board.lists.forEach(list => {
        list.cards.forEach(() => {
          numberOfCards++;
        });
      });
      return numberOfCards;
    },
    numberOfCardsCreatedByMe(state) {
      if (state.isLoading) return 0;
      let numberOfCards = 0;
      state.board.lists.forEach(list => {
        list.cards.forEach(card => {
          if (card.owner === state.user._id) {
            numberOfCards++;
          }
        });
      });
      return numberOfCards;
    },
    numberOfArchivedCards(state) {
      if (state.isLoading) return 0;
      let numberOfCards = 0;
      state.board.lists.forEach(list => {
        list.cards.forEach(card => {
          if (card.archived) {
            numberOfCards++;
          }
        });
      });
      return numberOfCards;
    },
    numberOfCardsAssignedToMe(state) {
      if (state.isLoading) return 0;
      let numberOfCards = 0;
      state.board.lists.forEach(list => {
        list.cards.forEach(card => {
          if (!card.assignedUsers) return;
          card.assignedUsers.forEach(user => {
            if (user._id === state.user._id) {
              numberOfCards++;
            }
          });
        });
      });
      return numberOfCards;
    }
  },
  mutations: {
    ...label.mutations,
    ...comment.mutations,
    ...board.mutations,
    ...list.mutations,
    isLoading(state, bool) {
      state.isLoading = bool;
    },
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
    createBoard(state, board) {
      state.user.boards.push(board);
    },
    updateBoard(state, board) {
      state.board.title = board.title;
      //   state.user.boards.find(stateBoard => stateBoard._id === board._id).title =
      //     board.title;
    },
    deleteBoard(state, { boardId }) {
      state.board = null;
      // state.user.boards = state.user.boards.filter(
      //   board => board._id !== boardId
      // );
    },
    addList(state, list) {
      state.board.lists.push(list);
    },
    addCard(state, card) {
      state.board.lists.find(list => list._id === card.list).cards.push(card);
    },
    removeCard(state, deletedCard) {
      state.board.lists.find(
        list => list._id === deletedCard.list
      ).cards = state.board.lists
        .find(list => list._id === deletedCard.list)
        .cards.filter(card => card._id !== deletedCard._id);
    },
    removeList(state, deletedList) {
      state.board.lists = state.board.lists.filter(list => {
        return list._id !== deletedList._id;
      });

      //For boardOverview
      // state.user.boards.find(
      //   board => board._id === deletedList.boardId
      // ).lists = state.user.boards
      //   .find(board => board._id === deletedList.boardId)
      //   .lists.filter(list => list !== deletedList._id);
    },
    addComment(state, comment) {
      state.board.lists.forEach(list => {
        let cardToAddCommment = list.cards.find(
          card => card._id === comment.cardId
        );
        if (cardToAddCommment) {
          cardToAddCommment.comments.push(comment);
        }
      });
    },
    updateCard(state, card) {
      const cardIndex = state.board.lists
        .find(list => list._id === card.list)
        .cards.findIndex(cardIterator => cardIterator._id === card._id);
      //Using Vue.set to change a value on an array, Vue.set(array, indexOfItem, newValue)
      Vue.set(
        state.board.lists.find(list => list._id === card.list).cards,
        cardIndex,
        card
      );
    },
    addUserToBoard(state, payload) {
      state.board.users.push(payload.user);
      // state.user.boards
      //   .find(board => board._id === payload.boardId)
      //   .users.push(payload.userId);
    },
    addUserToCard(state, payload) {
      const { user, listId, cardId } = payload;

      state.board.lists
        .find(list => list._id === listId)
        .cards.find(card => card._id === cardId)
        .assignedUsers.push(user);
    },
    removeUserFromBoard(state, payload) {
      //For the setBoard
      state.board.users = state.board.users.filter(user => {
        return user._id !== payload.userId;
      });
      //For the cards in setBoard
      state.board.lists.forEach(list => {
        list.cards.forEach(card => {
          card.assignedUsers = card.assignedUsers.filter(user => {
            return user._id !== payload.userId;
          });
        });
      });
      //For boardOverview
      // state.user.boards.find(
      //   board => board._id === payload.boardId
      // ).users = state.user.boards
      //   .find(board => board._id === payload.boardId)
      //   .users.filter(user => user !== payload.userId);
    },
    removeUserFromCard(state, { userId, cardId, listId }) {
      //Payload has userId, cardId and listId on it.

      // const { userId, cardId, listId } = payload;

      state.board.lists
        .find(list => list._id === listId)
        .cards.find(
          card => card._id === cardId
        ).assignedUsers = state.board.lists
        .find(list => list._id === listId)
        .cards.find(card => card._id === cardId)
        .assignedUsers.filter(user => user._id !== userId);
    },
    updateCardOrder(state, payload) {
      const { cards, listId } = payload;
      state.board.lists.find(list => list._id === listId).cards = cards;
    },
    updateListOrder(state, { lists }) {
      state.board.lists = lists;
    }
  },
  actions: {
    ...label.actions,
    ...comment.actions,
    ...board.actions,
    ...list.actions,
    ...card.actions,
    async login({ commit }, loginPayload) {
      const response = await AuthenticationService.login(loginPayload);

      commit('setToken', response.data.token);
      commit('setUser', response.data.user);
    },
    isLoading({ commit }, bool) {
      commit('isLoading', bool);
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
      commit('setBoard', null);
    },
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    addUserToBoard({ commit }, payload) {
      commit('addUserToBoard', payload);
    },
    removeUserFromBoard({ commit }, userId) {
      commit('removeUserFromBoard', userId);
    }
  }
});
