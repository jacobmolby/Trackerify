<template>
  <div class="py-3 flex justify-between items-center border-b border-gray-200">
    <div class="flex-1 flex">
      <!-- Hamburger button -->
      <button class="lg:hidden" @click="$emit('openSidebar')">
        <svg class="h-6 w-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      <!-- Search bar -->
      <div class="flex-shrink ml-3 lg:ml-0 relative">
        <span class="absolute pl-2 inset-y-0 left-0 flex items-center">
          <svg class="h-4 w-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            />
          </svg>
        </span>
        <input
          class="block w-full py-2 pl-10 text-sm rounded-lg border border-gray-400 text-gray-900 placeholder-gray-600"
          placeholder="Search"
        />
      </div>
    </div>
    <!-- Notification Bell -->
    <div class="ml-6 flex justify-between py-2 items-center">
      <button
        @click="$store.dispatch('notify', {message: 'Notifications is not yet implemented'})"
        class="text-gray-500"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"
          />
        </svg>
      </button>
      <!-- Profile picture -->
      <div class="ml-6 relative">
        <button
          @click="isOpen = !isOpen"
          class="relative block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-200 hover:border-purple-700"
          :class="isOpen ? 'border-purple-700 z-50' : ''"
        >
          <img class="h-full w-full object-cover" :src="user.profileImage" alt />
        </button>
        <div
          v-if="isOpen"
          class="z-30 absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
        >
          <span class="block px-4 py-2 text-gray-800 font-medium border-b">{{user.name}}</span>
          <router-link
            to="/settings"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white"
          >Account settings</router-link>
          <a
            href="#"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white"
          >Support</a>
          <button
            @click="logout"
            class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white"
          >Sign out</button>
        </div>
        <portal class="relative" to="popup-container" v-if="isOpen">
          <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
        </portal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'TheTopbar',
  data: () => ({
    isOpen: false
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout', true);
    }
  },
  created() {
    const handleEscape = e => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false;
      }
    };
    document.addEventListener('keydown', handleEscape);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape);
    });
  }
};
</script>

<style>
</style>