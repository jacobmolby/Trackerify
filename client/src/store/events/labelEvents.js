import Vue from 'vue';
import LabelService from '../../services/LabelService';
import LabelCardService from '../../services/LabelCardService';

export default {
  mutations: {
    addLabelToBoard(state, label) {
      //Using state to access the store
      state.board.labels.push(label);
    },
    removeLabelFromBoard(state, { labelId }) {
      //Using state to access the store
      state.board.labels = state.board.labels.filter(
        label => label._id !== labelId
      );

      state.board.lists.forEach(list => {
        list.cards.forEach(card => {
          card.labels = card.labels.filter(label => {
            return label._id !== labelId;
          });
        });
      });
    },
    addLabelToCard(state, payload) {
      const { cardId, newLabel } = payload;

      //Using state to access the store
      state.board.lists.forEach(list => {
        if (list.cards.length > 0) {
          const card = list.cards.find(card => {
            return card._id == cardId;
          });
          if (card) card.labels.push(newLabel);
        }
      });
    },
    removeLabelFromCard(state, payload) {
      const { cardId, labelId } = payload;
      //Using state to access the store

      state.board.lists.forEach(list => {
        if (list.cards.length > 0) {
          const cardWithLabel = list.cards.find(card => {
            return card._id === cardId;
          });
          if (cardWithLabel)
            cardWithLabel.labels = cardWithLabel.labels.filter(label => {
              return label._id !== labelId;
            });
        }
      });
    },
    updateLabel(state, updatedLabel) {
      const { _id, color, title } = updatedLabel;

      //Using state to access the store

      let labelIndex = state.board.labels.findIndex(label => label._id === _id);
      Vue.set(state.board.labels, labelIndex, updatedLabel);

      state.board.lists.forEach(list => {
        list.cards.forEach(card => {
          card.labels.forEach(label => {
            if (label._id === _id) {
              label.color = color;
              label.title = title;
            }
          });
        });
      });
    }
  },
  actions: {
    async addLabelToBoard({ commit }, payload) {
      const label = (await LabelService.post(payload)).data;
      commit('addLabelToBoard', label);
    },
    async removeLabelFromBoard({ commit }, payload) {
      await LabelService.delete(payload);
      commit('removeLabelFromBoard', { labelId: payload.labelId });
    },
    async addLabelToCard({ commit }, payload) {
      await LabelCardService.post({
        cardId: payload.cardId,
        labelId: payload.newLabel._id
      });
      commit('addLabelToCard', payload);
    },
    async removeLabelFromCard({ commit }, payload) {
      await LabelCardService.delete(payload);
      commit('removeLabelFromCard', payload);
    },
    async updateLabel({ commit }, payload) {
      const updatedLabel = (await LabelService.put(payload)).data;
      commit('updateLabel', updatedLabel);
    }
  }
};
