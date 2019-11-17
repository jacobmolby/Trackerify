<template>
  <header class="bg-deepblue-700 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-6">
    <div class="flex items-center justify-between px-4 py-3 sm:p-0">
      <router-link to="/" @click.native="isOpen = false" class="flex items-center">
        <svg class="fill-current text-white h-6 w-6 mr-2" viewBox="0 0 20 20">
          <path
            d="M15.3 14.89l2.77 2.77a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-2.59-2.58A5.99 5.99 0 0 1 11 18V9.04a1 1 0 0 0-2 0V18a5.98 5.98 0 0 1-3.07-1.51l-2.59 2.58a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l2.77-2.77A5.95 5.95 0 0 1 4.07 13H1a1 1 0 1 1 0-2h3V8.41L.93 5.34a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0l2.1 2.1h11.12l2.1-2.1a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41L16 8.41V11h3a1 1 0 1 1 0 2h-3.07c-.1.67-.32 1.31-.63 1.89zM15 5H5a5 5 0 1 1 10 0z"
          />
        </svg>
        <h1 class="text-gray-100 font-bold tracking-wide text-xl ml-2">Trackerify</h1>
      </router-link>
      <div class="sm:hidden">
        <button
          @click="isOpen = !isOpen"
          type="button"
          class="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path
              v-if="isOpen"
              fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
            <path
              v-if="!isOpen"
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
      </div>
    </div>

    <nav :class="isOpen ? 'block' : 'hidden'" class="px-2 pt-2 pb-4 sm:flex sm:p-0">
      <router-link
        v-if="isUserLoggedIn"
        @click.native="isOpen = false"
        to="/profile"
        class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-deepblue-500 sm:mt-0 sm:ml-2"
      >Profile</router-link>
      <button
        v-if="isUserLoggedIn"
        @click="logout(); isOpen = false"
        class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-deepblue-500 sm:mt-0 sm:ml-2"
      >Log Out</button>
      <router-link
        v-if="!isUserLoggedIn"
        @click.native="isOpen = false"
        to="/register"
        class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-deepblue-500 sm:mt-0 sm:ml-2"
      >Sign Up</router-link>
      <router-link
        v-if="!isUserLoggedIn"
        @click.native="isOpen = false"
        to="/login"
        class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-deepblue-500 sm:mt-0 sm:ml-2"
      >Sign In</router-link>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "home"
      });
    }
  },
  computed: mapState(["isUserLoggedIn"])
};
</script>