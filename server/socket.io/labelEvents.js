module.exports = socket => {
  socket.on('addLabelToBoard', label => {
    socket.broadcast.to(label.boardId).emit('addLabelToBoard', label);
  });

  socket.on('removeLabelFromBoard', payload => {
    socket.broadcast
      .to(payload.boardId)
      .emit('removeLabelFromBoard', payload.labelId);
  });

  socket.on('addLabelToCard', payload => {
    const { newLabel, cardId, boardId } = payload;
    socket.broadcast.to(boardId).emit('addLabelToCard', { newLabel, cardId });
  });

  socket.on('removeLabelFromCard', payload => {
    const { cardId, labelId, boardId } = payload;
    socket.broadcast
      .to(boardId)
      .emit('removeLabelFromCard', { cardId, labelId });
  });
};
