export default {
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
      if (list) {
        list.cards.forEach(card => {
          if (!card.archived) {
            numberOfCards++;
          }
        });
      }
    });
    return numberOfCards;
  },
  cardsCreatedByMe(state) {
    let cardsByMe = [];
    if (state.isLoading) return 0;
    state.board.lists.forEach(list => {
      list.cards.forEach(card => {
        if (card.owner === state.user._id && !card.archived) {
          cardsByMe.push(card);
        }
      });
    });
    return cardsByMe;
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
          if (user._id === state.user._id && !card.archived) {
            numberOfCards++;
          }
        });
      });
    });
    return numberOfCards;
  }
};
