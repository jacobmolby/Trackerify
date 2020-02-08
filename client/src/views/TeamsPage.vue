<template>
  <div class="flex overflow-hidden h-screen">
    <Sidebar @closeSidebar="isOpen=false" :isOpen="isOpen" />
    <div v-if="!isLoading" class="flex-1 flex flex-col min-w-0 bg-white">
      <div class="flex-shrink-0 border-b border-gray-200">
        <header class>
          <div class="px-6">
            <TheTopbar @openSidebar="isOpen = true" />
            <div class="py-2 flex items-center justify-between">
              <h1 class="font-semibold text-2xl text-gray-800">Teams</h1>
              <div>
                <CreateTeam />
              </div>
            </div>
          </div>
        </header>
      </div>

      <!-- MAIN CONTENT -->
      <div class="flex-1 overflow-auto px-6">
        <div
          v-if="teams.length > 0"
          class="mt-6 flex justify-center flex-col md:flex-row md:flex-wrap"
        >
          <div
            class="w-full max-w-xl mt-2 mb-10 flex flex-col mx-5"
            v-for="team in teams"
            :key="team._id"
          >
            <TeamCard :team="team" />
          </div>
        </div>
        <div
          v-if="teams.length == 0"
          class="mt-6 flex justify-center flex-col md:flex-row md:flex-wrap"
        >
          <div class="m-auto text-4xl p-6 font-light">There are no teams. You should create one.</div>
        </div>
      </div>
      <div v-if="error">{{error}}</div>
      <!-- END MAIN CONTENT -->
      <button
        @click="isOpen = false"
        :class="isOpen ? 'block' : 'hidden'"
        class="absolute w-full h-full inset-0 bg-black opacity-50 lg:hidden cursor-default"
      ></button>
    </div>
    <LoadingSpinner v-if="isLoading" class="mt-10 flex items-center justify-center" />
    <ConnectionLost />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TeamService from '../services/TeamService';
import CreateTeam from '../components/teams/CreateTeam';
import TeamCard from '../components/teams/TeamCard';
import TeamMemberCard from '../components/teams/TeamMemberCard';
import Sidebar from '../components/Sidebar';
import TheTopbar from '../components/TheTopbar';
import LoadingSpinner from '../components/reusables/LoadingSpinner';
import ConnectionLost from '../components/reusables/ConnectionLost';
export default {
  components: {
    Sidebar,
    TheTopbar,
    CreateTeam,
    TeamCard,
    LoadingSpinner,
    ConnectionLost
  },
  data: () => ({
    isOpen: false,
    error: null
  }),
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      teams: state => state.teams
    })
  },
  async mounted() {
    this.$store.dispatch('setTeams');
  }
};
</script>

<style>
</style>