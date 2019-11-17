<template>
  <main class="p-10 text-gray-700">
    <div class="container flex justify-center items-start">
      <section class="w-full sm:max-w-md">
        <h1 class="text-left text-3xl font-bold">Profile</h1>
        <div class="py-3 text-xl flex border-t-2 justify-between items-center">
          <p>Name:</p>
          <p class="font-semibold">{{this.user.name}}</p>
        </div>
        <div class="py-3 border-t text-xl flex justify-between items-center">
          <p>Email:</p>
          <p class="font-semibold">{{this.user.email}}</p>
        </div>
        <div class="py-3 border-t text-xl flex justify-between items-center">
          <p>Image:</p>
          <img
            class="h-24 w-24 object-cover rounded-full"
            :src="getProfilePic()"
            alt="Profile Picture"
          />
        </div>
        <h2 class="mt-10 text-2xl font-semibold">Other Team Members</h2>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    getProfilePic() {
      if (this.user.profileIMG) {
        return this.user.profileIMG;
      } else {
        return "img/no-profile-picture.png";
      }
    }
  }
};
</script>

<style>
</style>