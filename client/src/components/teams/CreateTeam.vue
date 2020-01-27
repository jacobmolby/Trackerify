<template>
  <div>
    <button @click="addTeamIsOpen = true" class="primary-btn">
      <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
        <path
          d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"
        />
      </svg>
      <span class="ml-1">Create New Team</span>
    </button>

    <!-- Begin POPUP -->
    <portal to="popup-container" v-if="addTeamIsOpen">
      <button @click="addTeamIsOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <div class="flex items-center justify-between border-b">
          <h2 class="text-left text-lg font-semibold">Create Team</h2>
          <button class="ml-4 hover:text-gray-900" @click="addTeamIsOpen = false">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <div class="pt-3 flex flex-col">
          <input
            v-model.trim="teamName"
            class="p-2 rounded border border-gray-400"
            type="text"
            placeholder="Team Name"
          />
          <div class="my-2">
            <h4 class="font-medium">Members</h4>

            <ul>
              <li
                class="mt-2 first:mt-1 p-1 px-2 border rounded shadow"
                v-for="user in teamMembers"
                :key="user._id"
              >
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <div class="w-8 h-8">
                      <img
                        class="object-cover border border-gray-500 rounded-full"
                        :src="user.profileImage"
                        :alt="user.name"
                      />
                    </div>
                    <span class="ml-4">{{user.name}}</span>
                  </div>
                  <button @click="removeTeamMember(user)">
                    <svg
                      class="h-3 w-3 fill-current text-gray-600 hover:text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex">
            <input
              @change="search"
              class="w-full p-2 rounded-l rounded-r-none border-t border-l border-b border-gray-400"
              v-model.trim="searchInput"
              type="search"
              placeholder="Name or Email"
            />
            <button class="py-2 px-4 rounded-r rounded-l-none bg-purple-800 hover:bg-purple-600">
              <span class="text-white">Search</span>
            </button>
          </div>
          <div class="mt-2">
            <ul class="border rounded" v-if="searchResult.length > 0">
              <li
                class="border-t first:border-t-0 rounded-none first:rounded-t last:rounded-b hover:bg-green-400 odd:bg-gray-100"
                v-for="user in searchResult"
                :key="user._id"
              >
                <button
                  @click="addTeamMember(user)"
                  class="w-full text-left py-1 px-2 hover:text-white"
                >{{user.name}}</button>
              </li>
            </ul>
            <div class="text-gray-700">{{searchMessage}}</div>
          </div>
          <div class="text-red-500">{{error}}</div>
          <button @click="createTeam" class="mt-2 primary-btn">Create Team</button>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import UserSearchService from '../../services/UserSearchService';

export default {
  data: () => ({
    addTeamIsOpen: false,
    teamName: '',
    searchInput: '',
    searchMessage: '',
    searchResult: [],
    teamMembers: [],
    error: ''
  }),
  methods: {
    async search() {
      this.searchMessage = 'Loading...';
      this.searchResult = [];
      try {
        const response = (await UserSearchService.get(this.searchInput)).data;
        console.log(response);

        if (response.length > 0) {
          this.searchResult = response;
          this.searchMessage = '';
        } else {
          this.searchMessage = 'No search result.';
        }
      } catch (error) {
        console.log('err');

        this.searchMessage = error.response.data.error;
      }
    },
    addTeamMember(user) {
      if (this.teamMembers.includes(user)) {
        return;
      } else {
        this.searchInput = '';
        this.searchResult = this.searchResult.filter(
          resultUser => resultUser._id !== user._id
        );
        this.teamMembers.push(user);
      }
    },
    removeTeamMember(user) {
      this.teamMembers = this.teamMembers.filter(
        teamMember => teamMember._id !== user._id
      );
    },
    async createTeam() {
      this.error = '';
      if (!this.teamName) {
        return (this.error = 'Please choose a team name.');
      }

      const teamMemberIds = this.teamMembers.map(member => member._id);
      try {
        await this.$store.dispatch('createTeam', {
          teamName: this.teamName,
          teamMembers: teamMemberIds
        });

        this.teamMembers = [];
        this.teamName = '';
        this.addTeamIsOpen = false;
        this.searchInput = '';
        this.searchMessage = '';
        this.searchResult = [];
        this.error = '';
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style>
</style>