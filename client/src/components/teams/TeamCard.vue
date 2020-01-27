<template>
  <div class="min-w-full bg-gray-100 rounded shadow-lg">
    <div class="p-3 w-full flex justify-between items-center border-b rounded-t bg-purple-600">
      <h3 class="font-medium text-white">{{team.name}}</h3>
      <DeletePopup
        v-if="isOwner"
        @deleteFunction="deleteTeam"
        :deleteText="'remove'"
        :color="'white'"
      >{{team.name}}</DeletePopup>
    </div>
    <div class="p-4 flex justify-between">
      <div class="w-1/2 mr-3 flex flex-col justify-between">
        <div>
          <h4 class="font-medium">Members</h4>

          <ul>
            <li
              class="mt-2 first:mt-1 p-1 px-2 bg-white rounded shadow"
              v-for="user in team.users"
              :key="user._id"
            >
              <TeamMemberCard :isOwner="isOwner" :user="user" />
            </li>
          </ul>
        </div>
        <button class="primary-btn mt-2">
          <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M2 6H0v2h2v2h2V8h2V6H4V4H2v2zm7 0a3 3 0 0 1 6 0v2a3 3 0 0 1-6 0V6zm11 9.14A15.93 15.93 0 0 0 12 13c-2.91 0-5.65.78-8 2.14V18h16v-2.86z"
            />
          </svg>
          <span class="ml-2">Add Team Member</span>
        </button>
      </div>
      <div class="w-1/2 pl-3 border-l flex flex-col justify-between">
        <div>
          <h4 class="font-medium">Boards</h4>
          <ul>
            <li class="mt-2 first:mt-1" v-for="i in 2" :key="i">
              <div class="p-1 px-2 bg-white rounded shadow hover:shadow-lg active:shadow-inner">
                <button class="w-full">
                  <div class="border-b">
                    <h4 class="font-semibold text-sm">Development</h4>
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-xs">3 Lists</span>
                    <span class="text-xs font-light">Last Updated: 4-1-2020</span>
                  </div>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <button class="primary-btn mt-2">
          <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M12 4H8v12h4V4zm2 0v12h4V4h-4zM6 4H2v12h4V4zM0 2h20v16H0V2z" />
          </svg>
          <span class="ml-2">Add Board</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TeamMemberCard from './TeamMemberCard';
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
    deleteTeam() {
      const teamId = this.team._id;
    }
  },
  components: {
    TeamMemberCard,
    DeletePopup
  }
};
</script>

<style>
</style>