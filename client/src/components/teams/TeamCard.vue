<template>
  <div class="min-w-full h-full bg-gray-100 rounded shadow-lg">
    <div class="p-3 w-full flex justify-between items-center border-b rounded-t bg-purple-600">
      <h3 v-if="!editingTitle" :class="`_${team._id}`" class="font-medium text-white">{{team.name}}</h3>
      <input
        v-if="editingTitle"
        type="text"
        :class="`_${team._id}`"
        class="bg-purple-800 font-medium text-white"
        @change="updateTitle"
        v-model="title"
      />
      <DeletePopup
        v-if="isOwner"
        @deleteFunction="deleteTeam"
        :deleteText="'remove'"
        :color="'white'"
      >{{team.name}}</DeletePopup>
      <button
        @click="leaveTeam"
        v-if="!isOwner"
        class="font-light text-white hover:text-gray-500"
      >Leave Team</button>
    </div>
    <!-- Its a bit hacky, but it works without using calc() -->
    <div class="-mt-12 h-full p-4 pt-16 flex justify-between">
      <div class="w-1/2 mr-3 flex flex-col justify-between">
        <div>
          <h4 class="font-medium">Members</h4>

          <ul>
            <li
              class="mt-2 first:mt-1 p-1 px-2 bg-white rounded shadow"
              v-for="user in team.users"
              :key="user._id"
            >
              <TeamMemberCard :teamId="team._id" :isOwner="isOwner" :user="user" />
            </li>
          </ul>
        </div>
        <AddTeamMember :team="team" />
      </div>
      <div class="w-1/2 pl-3 border-l flex flex-col justify-between">
        <div>
          <h4 class="font-medium">Boards</h4>
          <ul>
            <li class="mt-2 first:mt-1" v-for="board in team.boards" :key="board._id">
              <TeamBoardCard :teamId="team._id" :board="board" :isOwner="isOwner" />
            </li>
          </ul>
        </div>
        <AddBoardToTeam :team="team" />
      </div>
    </div>
  </div>
</template>

<script>
import TeamMemberCard from './TeamMemberCard';
import AddTeamMember from './AddTeamMember';
import AddBoardToTeam from './AddBoardToTeam';
import TeamBoardCard from './TeamBoardCard';

import DeletePopup from '../reusables/DeletePopup';
import { mapState } from 'vuex';
export default {
  data: () => ({
    editingTitle: false,
    title: ''
  }),
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user._id
    }),
    isOwner() {
      return this.userId === this.team.owner ? true : false;
    }
  },
  methods: {
    async updateTitle() {
      console.log(this.title);

      if (this.title === '') return;
      try {
        await this.$store.dispatch('updateTeamName', {
          teamId: this.team._id,
          teamName: this.title
        });
        this.editingTitle = false;
      } catch (error) {
        console.log(error);
      }
    },
    async leaveTeam() {
      const teamId = this.team._id;
      const userId = this.userId;
      try {
        await this.$store.dispatch('leaveTeam', { teamId, userId });
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async deleteTeam() {
      const teamId = this.team._id;
      try {
        await this.$store.dispatch('deleteTeam', teamId);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  },
  updated() {
    if (!this.editingTitle) {
      this.title = this.team.name;
    }
  },
  created() {
    this.title = this.team.name;

    const handleTitleKeyPresses = e => {
      if (this.editingTitle === false) {
        return;
      }
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.editingTitle = false;
      }
    };

    const handleClick = e => {
      const clickedTitle = e.target.closest(`h3._${this.team._id}`);
      const clickedInput = e.target.closest(`input._${this.team._id}`);
      //If clicked on the title, initiate editingmode

      if (!!clickedTitle && !this.editingTitle) {
        this.editingTitle = true;

        //If editingmode is on, turn it off
      } else if (!clickedInput && this.editingTitle) {
        this.editingTitle = false;
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleTitleKeyPresses);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleTitleKeyPresses);
      document.removeEventListener('click', handleClick);
    });
  },
  components: {
    TeamMemberCard,
    DeletePopup,
    AddTeamMember,
    AddBoardToTeam,
    TeamBoardCard
  }
};
</script>

<style>
</style>