<template>
  <div id="app">
  <header class="bg-gray1 p-[25px]">
    <div class="container mx-auto flex items-center gap-4">
      <router-link class="text-gray4 font-bold text=[15px] sm:text-xl hover:text-white mr-4" to="/">Movies & TV Shows List</router-link>
      <router-link :class="{ 'text-white': $route.path === '/popular-movies' || $route.meta.ariaCurrent, 'text-gray3': $route.path !== '/popular-movies' && !$route.meta.ariaCurrent }" class="hover:text-white mr-4" to="/popular-movies">Popular Movies</router-link>
      <router-link :class="{ 'text-white': $route.path === '/popular-tv-shows' || $route.meta.ariaCurrent, 'text-gray3': $route.path !== '/popular-tv-shows' && !$route.meta.ariaCurrent }" class="hover:text-white mr-4" to="/popular-tv-shows">Popular TV Shows</router-link>
      <router-link :class="{ 'text-white': $route.path === '/watchlist' || $route.meta.ariaCurrent, 'text-gray3': $route.path !== '/watchlist' && !$route.meta.ariaCurrent }" class="hover:text-white" to="/watchlist">Watchlist</router-link>
    </div>
  </header>

  <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>


