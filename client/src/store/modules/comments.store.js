export default {
  mutations: {
    removeCommentFromCard(localState, payload) {
      const { cardId, commentId, listId } = payload;
      //Using this.state to access the store

      let card = this.state.board.lists
        .find(list => {
          return list._id === listId;
        })
        .cards.find(card => {
          return card._id === cardId;
        });

      card.comments = card.comments.filter(comment => {
        return comment._id !== commentId;
      });
    }
  },
  actions: {
    removeCommentFromCard({ commit }, payload) {
      commit('removeCommentFromCard', payload);
    }
  }
};
