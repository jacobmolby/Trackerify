<template>
  <div id="app" class="h-screen">
    <!-- <NavBar /> -->
    <!-- <div class="flex">
      <div class="h-12 w-1/5 bg-deepblue-300"></div>
      <div class="h-12 w-1/5 bg-deepblue-400"></div>
      <div class="h-12 w-1/5 bg-deepblue-500"></div>
      <div class="h-12 w-1/5 bg-deepblue-600"></div>
      <div class="h-12 w-1/5 bg-deepblue-700"></div>
    </div>-->
    <router-view />

    <!-- <div class="container mx-auto">
    </div>-->
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'app',
  components: {
    //NavBar
  }
};
</script>

<style>
.popup {
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
}
</style>
