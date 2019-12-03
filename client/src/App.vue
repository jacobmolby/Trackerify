<template>
  <div id="app" class="h-screen">
    <div class="bg-white flex">
      <NavBar />
      <!-- <div class="flex">
      <div class="h-12 w-1/5 bg-deepblue-300"></div>
      <div class="h-12 w-1/5 bg-deepblue-400"></div>
      <div class="h-12 w-1/5 bg-deepblue-500"></div>
      <div class="h-12 w-1/5 bg-deepblue-600"></div>
      <div class="h-12 w-1/5 bg-deepblue-700"></div>
      </div>-->

      <div class="overflow-x-hidden flex flex-col flex-1">
        <TopBar />

        <router-view />
      </div>
    </div>
    <!-- <div class="container mx-auto">
    </div>-->
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TopBar from '@/components/TopBar.vue';
export default {
  name: 'app',
  components: {
    NavBar,
    TopBar
  }
};
</script>

<style>
.popup {
  z-index: 50;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
}
</style>
