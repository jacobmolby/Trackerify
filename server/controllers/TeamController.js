const Team = require('../models/Team.model');
const User = require('../models/User');
const Board = require('../models/Board');
module.exports = {
  async index(req, res) {
    const userId = req.user._id;

    try {
      let { teams } = await User.findById(userId)
        .select('teams')
        .populate('teams');

      //Maybe just include a users field on the team model?
      for (const team of teams) {
        const users = await User.find({ teams: team._id })
          .select('name profileImage')
          .lean();
        const boards = await Board.find({ _id: team.boards })
          .select('title lists owner')
          .lean();

        team._doc.users = users;
        team._doc.boards = boards;
      }
      res.send(teams);
    } catch (error) {
      res.status(400).send({ error });
    }
  },
  async create(req, res) {
    const { teamName, teamMembers } = req.body;
    const ownerId = req.user._id;
    try {
      const team = new Team({
        name: teamName,
        owner: ownerId
      });
      const savedTeam = await team.save();
      await User.findByIdAndUpdate(ownerId, {
        $addToSet: { teams: savedTeam._id }
      });
      if (teamMembers.length > 0) {
        await User.updateMany(
          { _id: { $in: teamMembers } },
          { $addToSet: { teams: savedTeam._id } }
        );
      }
      //Finds users with the team
      const users = await User.find({ teams: savedTeam._id }).select(
        'name profileImage'
      );

      savedTeam._doc.users = users;

      res.send(savedTeam);
    } catch (error) {
      console.log(error);

      res.status(400).send({ error });
    }
  },
  async update(req, res) {
    const { teamId, teamName } = req.body;
    try {
      const team = await Team.findByIdAndUpdate(
        teamId,
        { name: teamName },
        { new: true }
      ).lean();
      res.send(team);
    } catch (error) {
      res.status(400).send({ error });
    }
  },
  async destroy(req, res) {
    const { teamId } = req.params;

    try {
      const team = await Team.findByIdAndDelete(teamId);
      await User.updateMany(
        { teams: { _id: teamId } },
        { $pull: { teams: teamId } }
      );
      res.send(team);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
};
