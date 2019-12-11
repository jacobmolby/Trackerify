module.exports = socket => {
  socket.on('addComment', comment => {
    socket.broadcast.to(comment.boardId).emit('addComment', comment);
  });
};
