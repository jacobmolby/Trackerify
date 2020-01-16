<template>
  <aside class="w-32 flex-none">
    <div class="py-5 mb-20 leading-snug flex items-center justify-around bg-indigo-700">
      <router-link :to="{name: 'home'}" exact class="text-white font-bold text-lg">Trackerify</router-link>
    </div>

    <nav
      class="-mt-20 h-full flex flex-col items-center justify-between bg-gray-100 border-r border-gray-300 shadow"
    >
      <div class="min-w-full">
        <router-link
          class="py-5 w-full flex flex-col items-center text-gray-500 hover:text-gray-700 nav"
          to="/manage"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path
              d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"
            />
          </svg>
          Manage
        </router-link>
        <router-link
          class="py-5 w-full flex flex-col items-center text-gray-500 hover:text-gray-700 nav"
          to="/board"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path d="M12 4H8v12h4V4zm2 0v12h4V4h-4zM6 4H2v12h4V4zM0 2h20v16H0V2z" />
          </svg>
          Boards
        </router-link>
        <router-link
          class="py-5 w-full flex flex-col items-center text-gray-500 hover:text-gray-700 nav"
          to="/schedule"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path
              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
            />
          </svg>
          Schedule
        </router-link>
        <router-link
          class="py-5 w-full flex flex-col items-center text-gray-500 hover:text-gray-700 nav"
          to="/reports"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path
              d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"
            />
          </svg>
          Reports
        </router-link>
      </div>
      <div class="min-w-full">
        <router-link
          class="py-5 w-full flex flex-col items-center text-gray-500 hover:text-gray-700 nav"
          to="/settings"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path
              d="M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            />
          </svg>
          Settings
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'navbar'
};
</script>

<style scoped>
.router-link-active.nav {
  border-style: solid;
  border-left-width: 2px;
  border-color: #877ff5;
  color: #4a5568;
}
</style>