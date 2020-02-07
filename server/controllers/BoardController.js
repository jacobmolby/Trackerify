const Board = require('../models/Board');
const User = require('../models/User');
const Label = require('../models/Label');
const defaultLabels = require('../util/DefaultLabels');

const mongoose = require('mongoose');
module.exports = {
  async index(req, res) {
    const userId = req.user._id;

    try {
      const boards = await Board.find({ users: userId }).populate();
      res.send(boards);
    } catch (error) {
      res.status(400).send({ error });
    }
  },
  async create(req, res) {
    //Creates 5 default labels
    const labels = await Label.create(defaultLabels);
    try {
      const board = new Board({
        title: req.body.title,
        users: req.user._id,
        owner: req.user._id,
        labels
      });

      const savedBoard = await board.save();
      res.send(savedBoard.toJSON());
    } catch (error) {
      console.log(error);

      res.status(400).send({ error });
    }
  },
  async show(req, res) {
    const { id } = req.params;
    const userId = req.user._id;

    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        const board = await Board.findById(id)
          .populate({
            path: 'users',
            select: ['_id', 'name', 'profileImage']
          })
          .populate({
            path: 'lists',
            // model: 'List',
            populate: {
              path: 'cards',
              // model: 'Card'
              populate: [
                {
                  path: 'comments',
                  populate: {
                    path: 'user'
                  }
                },
                {
                  path: 'labels'
                },
                {
                  path: 'assignedUsers',
                  select: ['_id', 'name', 'profileImage']
                }
              ]
            }
          })
          .populate({
            path: 'labels'
          });

        if (!board) {
          return res.status(400).send({ error: "Board doesn't exist" });
        }

        //Authorizing the user
        if (!board.users.find(user => user._id.toString() === userId)) {
          return res
            .status(401)
            .send({ error: 'User not member of the board' });
        }

        res.send(board);
      } catch (error) {
        res.send(error);
      }
    } else {
      return res.status(400).send({ error: "Board doesn't exist" });
    }
  },
  async update(req, res) {
    const { boardId, title } = req.body;
    //TODO check if user is part of board
    try {
      const board = await Board.findByIdAndUpdate(
        boardId,
        { $set: { title } },
        { new: true }
      );
      res.send(board);
    } catch (error) {
      res.status(400).send({ error });
    }
  },
  async destroy(req, res) {
    const id = req.params.id;
    const userId = req.user._id;

    try {
      const board = await Board.findById(id);
      if (!board) {
        return res.status(400).send({ error: "Board doesn't exist" });
      }

      //Authorizing the user
      if (!board.users.find(user => user._id.toString() === userId)) {
        return res.status(401).send({ error: 'User not member of the board' });
      }

      const result = await Board.findByIdAndDelete(id);

      if (result) {
        return res.send(`Board: "${result.title}" deleted`);
      } else {
        return res.status(400).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.send({ error: error });
    }
  }
};
