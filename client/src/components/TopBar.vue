<template>
  <header class="py-3 flex-none bg-indigo-900">
    <div class="px-5 flex flex-shrink-0 justify-end items-center">
      <div class="flex justify-end items-center">
        <div
          v-if="this.$store.state.isUserLoggedIn"
          class="px-4 flex items-center border-l border-indigo-700"
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
          class="flex items-center border-l text-white border-indigo-700"
        >
          <button class="ml-4 p-2 rounded hover:bg-indigo-700">Logout</button>
        </div>
        <div
          v-if="!this.$store.state.isUserLoggedIn"
          @click="register"
          class="py-5 h-4 flex items-center text-white border-indigo-700"
        >
          <button class="ml-4 p-2 rounded hover:bg-indigo-700">Register</button>
        </div>
        <div
          v-if="!this.$store.state.isUserLoggedIn"
          @click="login"
          class="py-5 h-4 flex items-center text-white border-indigo-700"
        >
          <button class="ml-4 p-2 rounded hover:bg-indigo-700">Login</button>
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
    register() {
      this.$router.push({
        name: 'register'
      });
    },
    logout() {
      this.$store.dispatch('logout');
    }
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style>
</style>