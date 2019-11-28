<template>
  <header class="py-3 flex-none bg-indigo-500">
    <div class="px-5 flex flex-shrink-0 justify-between items-center">
      <div v-if="this.$store.state.isUserLoggedIn" class="pr-4 flex items-center justify-between">
        <svg class="h-4 w-4 fill-current text-gray-200" viewBox="0 0 20 20">
          <path
            d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
          />
        </svg>
        <input
          class="pl-4 bg-transparent text-gray-200 placeholder-gray-200 focus:outline-none"
          placeholder="Search for tasks...  "
          type="search"
        />
      </div>
      <div v-if="!this.$store.state.isUserLoggedIn"></div>
      <div class="flex justify-end items-center">
        <div v-if="this.$store.state.isUserLoggedIn" class="px-4 py-3">
          <svg class="h-4 w-4 fill-current text-gray-200" viewBox="0 0 20 20">
            <path
              d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z"
            />
          </svg>
        </div>
        <div
          v-if="this.$store.state.isUserLoggedIn"
          class="px-4 py-3 flex items-center border-l border-indigo-400"
        >
          <svg class="h-4 w-4 fill-current text-gray-200" viewBox="0 0 20 20">
            <path
              d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"
            />
          </svg>
        </div>
        <div
          v-if="this.$store.state.isUserLoggedIn"
          class="px-4 flex items-center border-l border-indigo-400"
        >
          <span class="text-white">{{user.name}}</span>
          <img
            class="ml-4 h-10 w-10 rounded-full object-cover"
            :src="user.profileImage"
            alt="Profile Image"
          />
        </div>
        <div
          v-if="this.$store.state.isUserLoggedIn"
          @click="logout"
          class="flex items-center border-l text-white border-indigo-400"
        >
          <button class="ml-4 p-2 rounded hover:bg-indigo-400">Logout</button>
        </div>
        <div
          v-if="!this.$store.state.isUserLoggedIn"
          @click="login"
          class="py-5 h-4 flex items-center text-white border-indigo-400"
        >
          <button class="ml-4 p-2 rounded hover:bg-indigo-400">Login</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'TopBar',
  methods: {
    login() {
      this.$router.push({
        name: 'login'
      });
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'home'
      });
    }
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style>
</style>