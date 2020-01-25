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
                <button class="primary-btn">Create New Team</button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <!-- MAIN CONTENT -->
      <div class="flex-1 overflow-auto px-6">
        <div class="flex justify-center items-center flex-col md:flex-row md:flex-wrap">
          <div class="w-full max-w-xl mt-2 mb-10 flex flex-col mx-5" v-for="i in 5" :key="i">
            <div class="min-w-full bg-gray-100 rounded shadow-lg">
              <div
                class="p-3 w-full flex justify-between items-center border-b rounded-t bg-purple-600"
              >
                <h3 class="font-medium text-white">DevOps</h3>
                <DeletePopup :color="'white'" />
              </div>
              <div class="p-4 flex justify-between">
                <div class="w-1/2 mr-3 flex flex-col justify-between">
                  <div>
                    <h4 class="font-medium">Members</h4>

                    <ul>
                      <li
                        class="mt-2 first:mt-1 p-1 bg-white rounded shadow"
                        v-for="i in 5"
                        :key="i"
                      >
                        <div class="flex justify-between items-center">
                          <div class="flex items-center">
                            <div class="w-8 h-8">
                              <img
                                class="object-cover border border-gray-500 rounded-full"
                                src="https://img.icons8.com/officel/48/000000/user.png"
                                alt="Username"
                              />
                            </div>
                            <span class="ml-4">Jacob Mølby</span>
                          </div>
                          <DeletePopup :color="'gray'" />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <button class="primary-btn mt-2">Add Team Member</button>
                </div>
                <div class="w-1/2 pl-3 border-l flex flex-col justify-between">
                  <div>
                    <h4 class="font-medium">Boards</h4>
                    <ul>
                      <li class="mt-2 first:mt-1" v-for="i in 6" :key="i">
                        <div class="p-1 bg-white rounded shadow hover:shadow-lg">
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
                  <button class="primary-btn mt-2">Add Board</button>
                </div>
              </div>
            </div>
          </div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Sidebar from '../components/Sidebar';
import DeletePopup from '../components/reusables/DeletePopup';
import TheTopbar from '../components/TheTopbar';
export default {
  components: {
    Sidebar,
    TheTopbar,
    DeletePopup
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