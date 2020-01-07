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
    addLabelToCard(localState, payload) {
      const { cardId, newLabel } = payload;

      //Using this.state to access the store
      this.state.board.lists.forEach(list => {
        if (list.cards.length > 0) {
          list.cards
            .find(card => {
              return card._id == cardId;
            })
            .labels.push(newLabel);
        }
      });
    },
    removeLabelFromCard(localState, payload) {
      const { cardId, labelId } = payload;
      //Using this.state to access the store

      let cardWithLabel;
      this.state.board.lists.forEach(list => {
        if (list.cards.length > 0) {
          cardWithLabel = list.cards.find(card => {
            return card._id === cardId;
          });
        }
      });
      cardWithLabel.labels = cardWithLabel.labels.filter(label => {
        return label._id !== labelId;
      });
    }
  },
  actions: {
    addLabelToBoard({ commit }, label) {
      commit('addLabelToBoard', label);
    },
    removeLabelFromBoard({ commit }, labelId) {
      commit('removeLabelFromBoard', labelId);
    },
    addLabelToCard({ commit }, payload) {
      commit('addLabelToCard', payload);
    },
    removeLabelFromCard({ commit }, payload) {
      commit('removeLabelFromCard', payload);
    }
  }
};
