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
    }
  },
  actions: {
    async removeCommentFromCard({ commit }, payload) {
      await CommentService.delete(payload.commentId);

      commit('removeCommentFromCard', payload);
    },
    async addComment({ commit }, payload) {
      const { listId, content, cardId } = payload;
      const boardId = this.state.board._id;

      const commentResponse = (await CommentService.post({ content, cardId }))
        .data;

      const comment = {
        ...commentResponse,
        listId,
        boardId
      };

      commit('addComment', comment);
    }
  }
};
