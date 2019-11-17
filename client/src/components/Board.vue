<template>
  <div class="bg-gray-100 flex min-w-screen h-screen">
    <nav-bar></nav-bar>
    <div class="overflow-x-hidden w-full">
      <top-bar></top-bar>
      <main class="px-10">
        <!-- OVER THE lists -->
        <div class="ml-2 pt-6 flex justify-between items-center">
          <div class="flex items-center">
            <h1 class="font-semibold text-2xl text-gray-700">Studio Board</h1>

            <add-list class="block"></add-list>
          </div>
          <div class="flex">
            <button>
              <svg
                class="mx-1 h-8 w-8 rounded-full border border-dashed border-gray-500 fill-current border-gray-500 text-gray-500"
                viewBox="0 0 30 30"
              >
                <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
              </svg>
            </button>
            <img
              class="mx-1 h-8 w-8 rounded-full object-cover"
              src="../../public/img/profile-img.jpg"
              alt="Profile Image"
            />
            <img
              class="mx-1 h-8 w-8 rounded-full object-cover"
              src="../../public/img/profile-img.jpg"
              alt="Profile Image"
            />
            <img
              class="mx-1 h-8 w-8 rounded-full object-cover"
              src="../../public/img/profile-img.jpg"
              alt="Profile Image"
            />
          </div>
        </div>
        <!-- BOARD AREA -->
        <div class="overflow-x-auto">
          <div class="py-6 h-full inline-flex flex-shrink-0 items-start">
            <div
              v-for="i in lists"
              :key="i"
              class="overflow-hidden mx-2 my-2 px-3 py-2 w-72 flex-shrink-0 flex flex-col bg-gray-200 rounded shadow-md border-t-4 border-red-300"
            >
              <List :numberofposts="posts" title="Backlog">
                <Card></Card>
              </List>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import List from '@/components/List.vue';
import Card from '@/components/Card.vue';
import AddList from '@/components/AddList.vue';
import NavBar from '@/components/NavBar.vue';
import TopBar from '@/components/TopBar.vue';
export default {
  name: 'Board',
  data() {
    return {
      posts: 4,
      lists: 4
    };
  },
  components: {
    List,
    Card,
    AddList,
    NavBar,
    TopBar
  }
};
</script>

<style>
</style>