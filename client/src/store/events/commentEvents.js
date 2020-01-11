import CommentService from '../../services/CommentService';

export default {
  mutations: {
    removeCommentFromCard(state, payload) {
      const { cardId, commentId, listId } = payload;

      let card = state.board.lists
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
    async removeCommentFromCard({ commit }, payload) {
      await CommentService.delete(payload.commentId);

      commit('removeCommentFromCard', payload);
    }
  }
};
