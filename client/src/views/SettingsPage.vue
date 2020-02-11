<template>
  <div class="flex overflow-hidden h-screen">
    <Sidebar @closeSidebar="isOpen=false" :isOpen="isOpen" />
    <div class="flex-1 flex flex-col min-w-0 bg-white">
      <div class="flex-shrink-0 border-b border-gray-200">
        <header class>
          <div class="px-6">
            <TheTopbar @openSidebar="isOpen = true" />
            <div class="py-2 flex items-center justify-between">
              <h1 class="font-semibold text-2xl text-gray-800">Account Settings</h1>
            </div>
          </div>
        </header>
      </div>

      <!-- MAIN CONTENT -->
      <div class="p-6 flex flex-col overflow-y-auto justify-between">
        <div class="mb-10">
          <h2 class="text-xl font-semibol text-gray-900 border-b mb-5">Information</h2>
          <div class="flex justify-between mb-2">
            <span>Name:</span>
            <span>{{user.name}}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Email:</span>
            <span>{{user.email}}</span>
          </div>
          <div class="flex justify-between">
            <span>Member since:</span>
            <span>{{memberSince}}</span>
          </div>
        </div>
        <div class="mb-10">
          <h2 class="text-xl font-semibol text-gray-900 border-b mb-5">Profile Image</h2>
          <div class="flex justify-between mb-2">
            <div class="flex flex-col justify-between">
              <UploadImage />
              <DeleteImage />
            </div>
            <img class="h-32 w-32 rounded-full" :src="user.profileImage" alt />
          </div>
        </div>
        <div class>
          <h2 class="text-xl font-semibol text-gray-900 border-b mb-5">Change Information</h2>
          <div class="flex justify-around mb-4">
            <button
              @click="changingEmail = !changingEmail; changingPassword = false;"
              class="btn btn-gray"
            >Change Email</button>
            <button
              @click="changingEmail = false; changingPassword = !changingPassword;"
              class="btn btn-gray"
            >Change Password</button>
          </div>
          <div v-if="changingEmail">
            <ChangeEmail @emailChanged="changingEmail = false" />
          </div>
          <div v-else-if="changingPassword">
            <ChangePassword @passwordChanged="changingPassword = false" />
          </div>
        </div>
      </div>

      <!-- END MAIN CONTENT -->
      <button
        @click="isOpen = false"
        :class="isOpen ? 'block' : 'hidden'"
        class="absolute w-full h-full inset-0 bg-black opacity-50 lg:hidden cursor-default"
      ></button>
    </div>
    <!-- <LoadingSpinner v-if="isLoading" class="mt-10 flex items-center justify-center" /> -->
  </div>
</template> 

<script>
import { mapState } from 'vuex';
// import LoadingSpinner from '../components/reusables/LoadingSpinner';
import moment from 'moment';
import ChangePassword from '../components/settings/ChangePassword';
import ChangeEmail from '../components/settings/ChangeEmail';
import DeleteImage from '../components/settings/DeleteImage';
import UploadImage from '../components/settings/UploadImage';
import TheTopbar from '../components/TheTopbar';
import Sidebar from '../components/Sidebar';
export default {
  name: 'settings',
  components: {
    TheTopbar,
    Sidebar,
    ChangePassword,
    ChangeEmail,
    DeleteImage,
    UploadImage
  },
  data() {
    return {
      isOpen: false,
      changingPassword: false,
      changingEmail: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    memberSince() {
      //TODO "user.createdAt" in production version

      return moment(this.user.created).format('DD MMMM, YYYY');
    }
  },
  methods: {}
};
</script>

<style>
</style>