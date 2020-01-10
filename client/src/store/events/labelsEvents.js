import Vue from 'vue';
import LabelService from '../../services/LabelService';
import LabelCardService from '../../services/LabelCardService';

export default {
  mutations: {
    addLabelToBoard(localState, label) {
      //Using this.state to access the store
      this.state.board.labels.push(label);
    },
    removeLabelFromBoard(localState, { labelId }) {
      //Using this.state to access the store
      this.state.board.labels = this.state.board.labels.filter(
        label => label._id !== labelId
      );

      this.state.board.lists.forEach(list => {
        list.cards.forEach(card => {
          card.labels = card.labels.filter(label => {
            return label._id !== labelId;
          });
        });
      });
    },
    addLabelToCard(state, payload) {
      const { cardId, newLabel } = payload;

      //Using this.state to access the store
      this.state.board.lists.forEach(list => {
        if (list.cards.length > 0) {
          const card = list.cards.find(card => {
            return card._id == cardId;
          });
          if (card) card.labels.push(newLabel);
        }
      });
    },
    removeLabelFromCard(localState, payload) {
      const { cardId, labelId } = payload;
      //Using this.state to access the store

      this.state.board.lists.forEach(list => {
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
    updateLabel(localState, updatedLabel) {
      const { _id, color, title } = updatedLabel;

      //Using this.state to access the store

      let labelIndex = this.state.board.labels.findIndex(
        label => label._id === _id
      );
      Vue.set(this.state.board.labels, labelIndex, updatedLabel);

      this.state.board.lists.forEach(list => {
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
      await LabelCardService.post(payload);
      commit('addLabelToCard', payload);
    },
    async removeLabelFromCard({ commit }, payload) {
      await LabelCardService.delete(payload);

      commit('removeLabelFromCard', payload);
    },
    updateLabel({ commit }, payload) {
      commit('updateLabel', payload);
    }
  }
};
