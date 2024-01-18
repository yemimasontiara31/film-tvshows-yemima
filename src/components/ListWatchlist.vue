<template>
  <div class="container px-[20px] sm:px-[80px] my-5 flex gap-5 items-center">
    <h2 class="text-2xl font-bold">My Watchlist</h2>

    <div @click="setActiveTab('film')" :class="{ 'active text-blue1 border-b-2 border-solid pb-[5px] border-blue1': activeTab === 'film' }" class="cursor-pointer">
      <h3 class="text-[13px] sm:text-[20px]">Film  
        <span class="text-black">( {{ watchMovies.length }} ) </span> 
      </h3>
    </div>

    <div @click="setActiveTab('tv')" :class="{ 'active text-blue1 border-b-2 border-solid pb-[5px] border-blue1': activeTab === 'tv' }" class="cursor-pointer">
      <h3 class="text-[13px] sm:text-[20px]">TV Shows 
        <span class="text-black">( {{ watchTVShow.length }} ) </span>
      </h3>
    </div>
  </div>

  <div v-if="activeTab === 'film'">
    <div class="container px-[0px] xl:px-[80px] mx-auto mb-[40px]">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          <div v-for="item in watchMovies" :key="item.id" class="relative col-span-1 gap-2 item transition-transform transform hover:scale-105 shadow-md rounded-lg p-[20px]">
            <router-link :to="{ name: 'movieDetail', params: { id: item.id } }">

              <img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + item.poster_path" :alt="item.original_title" class="w-full h-[450px] rounded-lg ">
              <h3 class="text-blue-1 my-2 overflow-hidden line-clamp-1">{{item.original_title}}</h3>
              <p class="mt-1 text-gray3">{{item.release_date}}</p>

              <div v-if="item.vote_average > 7 && item.vote_count > 1000" class="mt-2 text-lightblue absolute top-[20px] left-[30px] rounded-lg bg-blue1 p-[5px]">
                  Recommended
              </div>
            </router-link>

            <div @click="removeFromWatchlist(item.id)" class="cursor-pointer rounded-full p-[5px] border-2 border-blue1 mt-[20px] text-blue1 hover:bg-blue1 hover:text-white">
              <p class="text-center">Remove from Watchlist</p>
            </div>
          </div>
      </div>

      <div v-if="watchMovies.length === 0" class="m-20">
        <p class="text-center text-red font-bold">You haven't added any Films to your watchlist.</p>
      </div>
    </div>

    <div v-if="watchlistRemoveSuccess" class="remove-message">
      Film was removed from your Watchlist
    </div>
  </div>

  <div v-if="activeTab === 'tv'">
    <div class="container px-[0px] xl:px-[80px] mx-auto mb-[40px]">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          <div v-for="item in watchTVShow" :key="item.id" class="relative col-span-1 gap-2 item transition-transform transform hover:scale-105 shadow-md rounded-lg p-[20px]">
            <router-link :to="{ name: 'movieDetail', params: { id: item.id } }">

              <img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + item.poster_path" :alt="item.original_title" class="w-full h-[450px] rounded-lg ">
              <h3 class="text-blue-1 my-2 overflow-hidden line-clamp-1">{{item.original_title}}</h3>
              <p class="mt-1 text-gray3">{{item.release_date}}</p>

              <div v-if="item.vote_average > 7 && item.vote_count > 1000" class="mt-2 text-lightblue absolute top-[20px] left-[30px] rounded-lg bg-blue1 p-[5px]">
                  Recommended
              </div>
            </router-link>

            <div @click="removeTVWatchlist(item.id)" class="cursor-pointer rounded-full p-[5px] border-2 border-blue1 mt-[20px] text-blue1 hover:bg-blue1 hover:text-white">
              <p class="text-center">Remove from Watchlist</p>
            </div>
          </div>
      </div>

      <div v-if="watchTVShow.length === 0" class="m-20">
        <p class="text-center text-red font-bold">You haven't added any TV Show to your watchlist.</p>
      </div>
    </div>

    <div v-if="watchlistRemoveSuccess" class="remove-message">
      TV Show was removed from your Watchlist
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'ListWatchlist',

  data() {
    return {
      watchMovies: [],
      watchTVShow: [],
      activeTab: 'film',
      watchlistRemoveSuccess: false,
    };
  },

  mounted() {
    this.fetchMovieWatchList();
    this.fetchTVWatchList();
  },

  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    async fetchMovieWatchList() {
      const accountId = "20926803";
      const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mjk3YTAxNDJlZTc1ZDZhZmY2YjRhODFlODdlZjZkNCIsInN1YiI6IjY1YTY2YzBhZWI2NGYxMDEyYWY1MTVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yTqFum0ww3acgQ5KnQ7zg4AuPkZ4w7xoQdmO9mxL8iM";
      const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        this.watchMovies = response.data.results;
        console.log(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    },

    async fetchTVWatchList() {
      const accountId = "20926803";
      const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mjk3YTAxNDJlZTc1ZDZhZmY2YjRhODFlODdlZjZkNCIsInN1YiI6IjY1YTY2YzBhZWI2NGYxMDEyYWY1MTVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yTqFum0ww3acgQ5KnQ7zg4AuPkZ4w7xoQdmO9mxL8iM";
      const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/watchlist/tv`;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        this.watchTVShow = response.data.results;
        console.log(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    },

    async removeFromWatchlist(movieId) {
      const accountId = "20926803";
      const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mjk3YTAxNDJlZTc1ZDZhZmY2YjRhODFlODdlZjZkNCIsInN1YiI6IjY1YTY2YzBhZWI2NGYxMDEyYWY1MTVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yTqFum0ww3acgQ5KnQ7zg4AuPkZ4w7xoQdmO9mxL8iM";
      const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;

      try {
        await axios.post(apiUrl, {
          media_type: 'movie',
          media_id: movieId,
          watchlist: false,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        console.log('Movie removed from watchlist.');

        this.watchlistRemoveSuccess = true;

        setTimeout(() => {
          this.watchlistRemoveSuccess = false;
        }, 2000);

        await this.fetchMovieWatchList();

      } catch (error) {
        console.error('Error removing movie from watchlist:', error);
      }
    },

    async removeTVWatchlist(tvId) {
      const accountId = "20926803";
      const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mjk3YTAxNDJlZTc1ZDZhZmY2YjRhODFlODdlZjZkNCIsInN1YiI6IjY1YTY2YzBhZWI2NGYxMDEyYWY1MTVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yTqFum0ww3acgQ5KnQ7zg4AuPkZ4w7xoQdmO9mxL8iM";
      const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;

      try {
        await axios.post(apiUrl, {
          media_type: 'tv',
          media_id: tvId,
          watchlist: false,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        console.log('Movie removed from watchlist.');

        this.watchlistRemoveSuccess = true;

        setTimeout(() => {
          this.watchlistRemoveSuccess = false;
        }, 2000);

        await this.fetchTVWatchList();

      } catch (error) {
        console.error('Error removing movie from watchlist:', error);
      }
    },

  },
};
</script>

<style scoped>

.remove-message {
  position: fixed;
  top: 10px;
  right: 0;
  padding: 10px;
  margin: 10px;
  background-color: red;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

</style>
