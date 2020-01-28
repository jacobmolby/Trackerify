<template>
  <div class="min-w-full h-full bg-gray-100 rounded shadow-lg">
    <div class="p-3 w-full flex justify-between items-center border-b rounded-t bg-purple-600">
      <h3 class="font-medium text-white">{{team.name}}</h3>
      <DeletePopup
        v-if="isOwner"
        @deleteFunction="deleteTeam"
        :deleteText="'remove'"
        :color="'white'"
      >{{team.name}}</DeletePopup>
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
              <div class="p-1 px-2 bg-white rounded shadow hover:shadow-lg active:shadow-inner">
                <button class="w-full" @click="$router.push(`/board/${board._id}`)">
                  <div class="border-b">
                    <h4 class="font-semibold text-sm">{{board.title}}</h4>
                  </div>
                  <div class="flex flex-col text-left">
                    <span
                      class="text-xs"
                    >{{board.lists.length}} {{board.lists.length > 1 ? 'Lists': 'List'}}</span>
                    <span class="text-xs font-light">Last Updated: 4-1-2020</span>
                  </div>
                </button>
              </div>
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
import DeletePopup from '../reusables/DeletePopup';
import { mapState } from 'vuex';
export default {
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
    async deleteTeam() {
      const teamId = this.team._id;
      try {
        await this.$store.dispatch('deleteTeam', teamId);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  },
  components: {
    TeamMemberCard,
    DeletePopup,
    AddTeamMember,
    AddBoardToTeam
  }
};
</script>

<style>
</style>