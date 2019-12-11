module.exports = socket => {
  socket.on('addCard', card => {
    console.log(card.boardId);

    socket.broadcast.to(card.boardId).emit('addCard', card);
  });

  socket.on('removeCard', deletedCard => {
    socket.broadcast.to(deletedCard.boardId).emit('removeCard', deletedCard);
  });

  socket.on('updateCard', card => {
    socket.broadcast.to(card.boardId).emit('updateCard', card);
  });

  socket.on('addUserToCard', payload => {
    socket.broadcast.to(payload.boardId).emit('addUserToCard', payload);
  });

  socket.on('removeUserFromCard', payload => {
    socket.broadcast.to(payload.boardId).emit('removeUserFromCard', payload);
  });
};
