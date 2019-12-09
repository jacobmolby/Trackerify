<template>
  <div id="app" class="h-screen">
    <div class="bg-white flex">
      <NavBar />

      <div class="overflow-x-hidden flex flex-col flex-1">
        <TopBar />

        <router-view />
      </div>
    </div>
    <portal-target name="popup-container"></portal-target>
    <portal-target name="popup-container-important"></portal-target>
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  /* The same as max-w-lg */
  width: 32rem;
  background-color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 0.25rem;
  color: #4a5568;
}
.popup-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 25%;
  cursor: default;
}
</style>
