<template>
  <div id="app" class="h-screen">
    <router-view />

    <portal-target name="popup-container"></portal-target>
    <portal-target name="popup-container-important"></portal-target>
    <portal-target name="popup-container-more-important"></portal-target>
    <portal-target name="delete-popup"></portal-target>
    <NotificationModal />
    <portal-target name="connection-lost"></portal-target>
  </div>
</template>

<script>
import NotificationModal from './components/reusables/NotificationModal';
export default {
  name: 'app',
  components: {
    NotificationModal
  }
};
</script>

<style>
</style>
