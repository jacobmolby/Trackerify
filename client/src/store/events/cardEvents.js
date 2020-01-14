import CardService from '../../services/CardService';
import UserCardService from '../../services/UserCardService';
import CardOrderService from '../../services/CardOrderService';

export default {
  mutations: {},
  actions: {
    async addCard({ commit }, payload) {
      const card = (await CardService.post(payload)).data;
      commit('addCard', card);
    },
    async updateCard({ commit }, payload) {
      const card = (await CardService.updateCard(payload)).data;
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
    }
  }
};
