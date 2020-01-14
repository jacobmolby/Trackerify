<template>
  <div id="app" class="h-screen">
    <DesignV2 />
    <div class="bg-white flex">
      <NavBar />

      <div class="overflow-x-hidden flex flex-col flex-1">
        <TopBar />

        <router-view />
      </div>
    </div>
    <portal-target name="popup-container"></portal-target>
    <portal-target name="popup-container-important"></portal-target>
    <portal-target name="popup-container-more-important"></portal-target>
    <portal-target name="delete-popup"></portal-target>
    <portal-target name="connection-lost"></portal-target>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import DesignV2 from './views/DesignV2.vue';
import TopBar from '@/components/TopBar.vue';
export default {
  name: 'app',
  components: {
    DesignV2,
    NavBar,
    TopBar
  }
};
</script>

<style>
</style>
