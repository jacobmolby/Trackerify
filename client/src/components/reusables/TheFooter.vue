<template>
  <footer class="absolute bottom-0 pt-16 pb-6 text-sm text-center md:text-left fade-in">
    <span class="text-gray-500 no-underline hover:no-underline">
      &copy; Jacob Mølby 2020
      <br />This page is designed by
      <a
        class="hover:text-gray-900"
        href="https://github.com/tailwindtoolbox/App-Landing-Page"
      >Astrava.Solutions Ltd.</a>
    </span>
  </footer>
</template>

<script>
export default {
  name: 'thefooter'
};
</script>

<style scoped>
.fade-in {
  -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;
  animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>