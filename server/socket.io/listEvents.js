module.exports = socket => {
  socket.on('addList', list => {
    console.log(list);

    socket.broadcast.to(list.boardId).emit('addList', list);
  });

  socket.on('removeList', deletedList => {
    socket.broadcast.to(deletedList.boardId).emit('removeList', deletedList);
  });

  //update list order (draggable)
  socket.on('updateCardOrder', listOrder => {
    socket.broadcast.to(listOrder.boardId).emit('updateCardOrder', listOrder);
  });
  socket.on('updateListOrder', lists => {
    socket.broadcast.to(lists[0].boardId).emit('updateListOrder', lists);
  });
};
