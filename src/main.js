import { createApp } from 'vue';
import App from './App.vue';
import 'tailwindcss/tailwind.css'
import { createRouter, createWebHistory } from 'vue-router';
import ListPopularMovies from '@/components/ListPopularMovies.vue';
import ListPopularTVShows from '@/components/ListPopularTVShows.vue';
import ListWatchlist from '@/components/ListWatchlist.vue';
import MovieDetail from '@/components/MovieDetail.vue';
import TVDetail from '@/components/TVDetail.vue';

const routes = [
  { path: '/', redirect: '/popular-movies' },
  { path: '/popular-movies', component: ListPopularMovies },
  { path: '/popular-tv-shows', component: ListPopularTVShows },
  { path: '/watchlist', name: 'watchlist', component: ListWatchlist },
  { path: '/detail-movies/:id', component: MovieDetail, name: 'movieDetail' },
  { path: '/detail-tv-shows/:id', component: TVDetail, name: 'TVDetail' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app');
