<template>
  <div class="flex overflow-hidden h-screen">
    <Sidebar @closeSidebar="isOpen=false" :isOpen="isOpen" />
    <div v-if="!isLoading" class="flex-1 flex flex-col min-w-0 bg-white">
      <div class="flex-shrink-0 border-b border-gray-200">
        <header class>
          <div class="px-6">
            <TheTopbar @openSidebar="isOpen = true" />
            <div class="py-2 flex items-center justify-between">
              <h1 class="font-semibold text-2xl text-gray-800">Board Overview</h1>
            </div>
          </div>
        </header>
      </div>

      <!-- MAIN CONTENT -->

      <div v-if="error">{{error}}</div>
      <!-- END MAIN CONTENT -->
      <button
        @click="isOpen = false"
        :class="isOpen ? 'block' : 'hidden'"
        class="absolute w-full h-full inset-0 bg-black opacity-50 lg:hidden cursor-default"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Sidebar from '../components/Sidebar';
import TheTopbar from '../components/TheTopbar';
export default {
  components: {
    Sidebar,
    TheTopbar
  },
  data: () => ({
    isOpen: false,
    error: null
  }),
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  }
};
</script>

<style>
</style>