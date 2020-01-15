<template>
  <div class="h-screen flex overflow-hidden">
    <!-- Sidebar -->
    <section
      :class="isOpen ? 'translate-x-0 ease-out transition-250' : '-translate-x-full ease-in transition-250'"
      class="lg:block z-30 fixed inset-y-0 left-0 w-64 px-8 py-4 bg-gray-100 border-r overflow-y-auto lg:translate-x-0 lg:static lg:inset-auto"
    >
      <div class="flex items-center justify-between">
        <div class="font-bold">TRACKERIFY</div>
        <button class="lg:hidden" @click="isOpen = false">Close</button>
      </div>
      <nav class="mt-8">
        <h2 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Issues</h2>
        <div class="mt-2 -mx-3">
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium bg-gray-200 rounded-lg"
          >
            <span>All</span>
            <span class="text-sm font-semibold text-gray-700">36</span>
          </a>
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
          >
            <span>Created by me</span>
            <span class="text-sm font-semibold text-gray-700">2</span>
          </a>
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
          >
            <span>Archived</span>
            <span class="text-sm font-semibold text-gray-700">1</span>
          </a>
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
          >
            <span>Assigned to me</span>
            <span class="text-sm font-semibold text-gray-700"></span>
          </a>
        </div>
        <h2 class="mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wide">Tags</h2>
        <div class="mt-2 -mx-3">
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium bg-gray-200 rounded-lg"
          >
            <span>Bug</span>
          </a>
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
          >
            <span>Feature Request</span>
          </a>
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
          >
            <span>Marketing</span>
          </a>
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
          >
            <span>V2.0</span>
          </a>
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
          >
            <span>Enhancement</span>
          </a>
          <a
            href="#"
            class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
          >
            <span>Design</span>
          </a>
        </div>
        <button class="mt-4 text-sm font-medium text-gray-700 hover:text-gray-900">+ New Project</button>
      </nav>
    </section>
    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0 bg-white">
      <div class="flex-shrink-0 border-b border-gray-200">
        <header class>
          <div class="px-6">
            <div class="py-3 flex justify-between items-center border-b border-gray-200">
              <div class="flex-1 flex">
                <!-- Hamburger button -->
                <button class="lg:hidden" @click="isOpen = true">
                  <svg class="h-6 w-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
                <!-- Search bar -->
                <div class="flex-shrink ml-3 lg:ml-0 relative">
                  <span class="absolute pl-2 inset-y-0 left-0 flex items-center">
                    <svg class="h-4 w-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                      />
                    </svg>
                  </span>
                  <input
                    class="block w-full py-2 pl-10 text-sm rounded-lg border border-gray-400 text-gray-900 placeholder-gray-600"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div class="ml-6 flex justify-between py-2 items-center">
                <button class="text-gray-500">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"
                    />
                  </svg>
                </button>
                <button class="ml-6">
                  <img
                    class="h-7 w-7 rounded-full object-cover"
                    :src="'https://i.pravatar.cc/30?img=' + (Math.floor(Math.random() * 50))"
                    alt
                  />
                </button>
              </div>
            </div>
            <div class="py-2 flex items-center justify-between">
              <div class="sm:flex sm:items-center">
                <h1 class="text-2xl font-semibold text-gray-900 leading-tight">All Issues</h1>
                <div class="mt-1 flex items-center sm:mt-0 sm:ml-4">AVATARS</div>
              </div>
              <div class="flex items-center">
                <span class="p-1 hidden bg-gray-200 border rounded sm:inline-flex">
                  <button class="leading-tight px-2 py-1">Mobile</button>
                  <button class="leading-tight px-2 py-1 bg-white rounded shadow">Desktop</button>
                </span>
                <button class="ml-5 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded">
                  <span class>+ New Issue</span>
                </button>
              </div>
            </div>
          </div>
          <div class="flex p-1 bg-gray-200 border-t sm:hidden">
            <button class="w-1/2 leading-tight px-2 py-1">List</button>
            <button class="w-1/2 leading-tight px-2 py-1 bg-white rounded shadow">Board</button>
          </div>
        </header>
      </div>
      <div class="flex-1 overflow-auto">
        <main class="inline-flex h-full p-3 overflow-hidden">
          <div
            v-for="j in 4"
            :key="j"
            class="ml-3 lg:first:ml-0 flex-shrink-0 overflow-hidden flex flex-col py-3 w-72 bg-gray-100 rounded"
          >
            <h3 class="px-3 pb-1 flex-shrink-0 text-gray-700 text-sm font-medium">Backlog {{j}}</h3>
            <div class="flex-1 min-h-0 overflow-y-auto">
              <ul class="mt-2 px-3">
                <li
                  v-for="i in Math.floor(Math.random()*8)+2"
                  :key="i"
                  class="mb-2 p-3 rounded shadow bg-white"
                >
                  <div class="flex justify-between">
                    <a
                      href="#"
                      class="text-sm font-medium text-gray-800 leading-snug"
                    >Add Discount code to checkout page</a>
                    <img
                      v-for="z in 3"
                      :key="z"
                      class="-ml-2 first:ml-2 border-2 border-white h-6 w-6 rounded-full object-cover"
                      :src="'https://i.pravatar.cc/30?img=' + (Math.floor(Math.random() * 50))"
                      alt
                    />
                  </div>
                  <div class="mt-2 flex justify-between items-baseline">
                    <time class="text-xs text-gray-600">Sep 14</time>
                    <div>
                      <span
                        class="px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded-lg"
                      >
                        <svg class="h-2 w-2 text-teal-500" viewBox="0 0 8 8" fill="currentColor">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        <span class="ml-1 text-xs font-medium text-teal-900">Feature Request</span>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  }
};
</script>

<style>
:focus {
  outline: 0;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
  -webkit-border-radius: 100px;
}

::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 100px;
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.5);
  /*Some darker color when you click it */
  -webkit-border-radius: 100px;
}

/* add vertical min-height & horizontal min-width */
::-webkit-scrollbar-thumb:vertical {
  min-height: 10px;
}
::-webkit-scrollbar-thumb:horizontal {
  min-width: 10px;
}
</style>