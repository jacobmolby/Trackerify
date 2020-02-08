import CardService from '../../services/CardService';
import UserCardService from '../../services/UserCardService';
import CardOrderService from '../../services/CardOrderService';
import ArchiveCardService from '../../services/ArchiveCardService';
import Vue from 'vue';

export default {
  mutations: {
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
    archiveCard(state, { cardId }) {
      state.board.lists.forEach(list => {
        if (list.cards) {
          list.cards.forEach(card => {
            if (card._id === cardId) {
              card.archived = true;
            }
          });
        }
      });
    },
    restoreCard(state, { cardId }) {
      state.board.lists.forEach(list => {
        if (list.cards) {
          list.cards.forEach(card => {
            if (card._id === cardId) {
              card.archived = false;
            }
          });
        }
      });
    },
    addUserToCard(state, payload) {
      const { user, listId, cardId } = payload;

      state.board.lists
        .find(list => list._id === listId)
        .cards.find(card => card._id === cardId)
        .assignedUsers.push(user);
    },
    removeUserFromCard(state, { userId, cardId, listId }) {
      const cardWithUser = state.board.lists
        .find(list => list._id === listId)
        .cards.find(card => card._id === cardId);

      cardWithUser.assignedUsers = cardWithUser.assignedUsers.filter(
        user => user._id !== userId
      );
    },
    updateCardOrder(state, payload) {
      const { cards, listId } = payload;
      state.board.lists.find(list => list._id === listId).cards = cards;
    }
  },
  actions: {
    async addCard({ commit }, payload) {
      const card = (await CardService.post(payload)).data;
      commit('addCard', card);
    },
    async updateCard({ commit }, payload) {
      const card = (await CardService.put(payload)).data;
      commit('updateCard', card);
    },
    async removeCard({ commit }, { cardId }) {
      const deletedCard = (await CardService.delete(cardId)).data;
      commit('removeCard', deletedCard);
    },
    async addUserToCard({ commit }, payload) {
      const card = (await UserCardService.post(payload)).data;
      commit('addUserToCard', card);
    },
    async removeUserFromCard({ commit }, payload) {
      const { userId, cardId } = payload;
      await UserCardService.delete(userId, cardId);
      commit('removeUserFromCard', payload);
    },
    async updateCardOrder({ commit }, payload) {
      //Could use await if, you want to be sure you have matching data.
      CardOrderService.put(payload);
      commit('updateCardOrder', payload);
    },
    async archiveCard({ commit }, payload) {
      //Could use await if, you want to be sure you have matching data.

      await ArchiveCardService.post(payload);
      commit('archiveCard', payload);
    },
    async restoreCard({ commit }, payload) {
      //Could use await if, you want to be sure you have matching data.

      await ArchiveCardService.delete(payload);
      commit('restoreCard', payload);
    }
  }
};
