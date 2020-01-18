<template>
  <section
    :class="isOpen ? 'translate-x-0 ease-out transition-250' : '-translate-x-full ease-in transition-250'"
    class="lg:block z-10 fixed inset-y-0 left-0 w-64 px-8 py-4 bg-gray-100 border-r overflow-y-auto lg:translate-x-0 lg:static lg:inset-auto"
  >
    <div class="flex items-center justify-between">
      <div class="font-extrabold text-xl text-orange-500 border-b border-orange-500">
        <router-link :to="{name: 'boardOverview'}" exact>TRACKERIFY</router-link>
      </div>
      <button @click="$emit('closeSidebar')" class="lg:hidden">
        <svg class="h-4 w-4 fill-current text-gray-800" viewBox="0 0 20 20">
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
          />
        </svg>
      </button>
    </div>
    <nav class="mt-8">
      <slot />

      <TheNavigation />
    </nav>
  </section>
</template>

<script>
import TheNavigation from '../components/TheNavigation';

export default {
  components: {
    TheNavigation
  },
  props: { isOpen: Boolean }
};
</script>

<style>
</style>