<template>
  <div>

    <div class="top mt-10">
      <div class="columns mx-[80px]">
        <div class="column relative is-full featured_wrapper p-0">
          <img
            v-if="featuredMovie"
            :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + featuredMovie.poster_path"
            class="featured w-full rounded-xl"
            :alt="featuredMovie.original_name"
          >
          <div class="title_wrapper absolute top-[50px] left-[40px]" v-if="featuredMovie">
            <h2 class="text-red font-bold">Trending Today</h2>
            <h1 class="title text-white mt-[-35px]">{{featuredMovie.original_name}}</h1>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-2xl text-red font-bold mb-4 mt-10 text-center">Popular TV Shows</h2>

    <div class="container px-[80px] mx-auto">

      <div class="mb-4">
        <input v-model="searchQuery" @input="searchMovies" placeholder="Search TV Shows..." class="p-2 border border-gray-300 rounded-md w-full">
      </div>

      <div v-if="filteredTVShows.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          <div v-for="item in filteredTVShows" :key="item.id" class="relative col-span-1 gap-2 item transition-transform transform hover:scale-105 shadow-md rounded-lg p-[20px]">
              <router-link :to="{ name: 'TVDetail', params: { id: item.id } }">
                <img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + item.poster_path" :alt="item.original_title" class="w-full h-[450px] rounded-lg ">
                <h3 class="text-blue-1 my-2 overflow-hidden line-clamp-1">{{item.original_name}}</h3>
                <p class="mt-1 text-gray3">{{item.first_air_date}}</p>

                <div v-if="item.vote_average > 8 && item.vote_count > 1000" class="mt-2 text-lightblue absolute top-[20px] left-[30px] rounded-lg bg-blue1 p-[5px]">
                    Recommended
                </div>
              </router-link>

              <div @click="addToWatchlist(item.id)" class="cursor-pointer rounded-full p-[5px] border-2 border-blue1 mt-[20px] text-blue1 hover:bg-blue1 hover:text-white">
                <p class="text-center">Add to Watchlist</p>
              </div>
          </div>
        </div>
      </div>

      <div v-else class="m-20">
        <p class="text-center text-red">Not Found. Try Another Search.</p>
      </div>

    </div>

    <div v-if="watchlistSuccess" class="success-message">
      TV Shows was added to your Watchlist
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListPopularTVShows',
  data() {
    return {
      popularTVShows: [],
      featuredMovie: null,
      searchQuery: '',
      watchlistSuccess: false,
    };
  },

  mounted() {
    // Panggil API saat komponen di-mount
    this.fetchPopularTVShows();
    this.fetchFeaturedTVShows();
  },

  computed: {
    filteredTVShows() {
      return this.popularTVShows.filter(item =>
        item.original_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.first_air_date.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  methods: {
    async fetchPopularTVShows() {
      const apiKey = "9297a0142ee75d6aff6b4a81e87ef6d4";
      const apiUrl = "https://api.themoviedb.org/3/tv/popular";

      try {
          const response = await axios.get(`${apiUrl}?api_key=${apiKey}`);

          this.popularTVShows = response.data.results;
          console.log(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    },

    async fetchFeaturedTVShows() {
      const apiKey = "9297a0142ee75d6aff6b4a81e87ef6d4";
      const apiUrl = "https://api.themoviedb.org/3/trending/tv/day";

      try {
        const response = await axios.get(`${apiUrl}?api_key=${apiKey}`);

        this.featuredMovie = response.data.results[0];

      } catch (error) {
        console.error('Error fetching featured tv shows:', error);
      }
    },


    async addToWatchlist(mediaId) {
      try {
        const accountId = "20926803";
        const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mjk3YTAxNDJlZTc1ZDZhZmY2YjRhODFlODdlZjZkNCIsInN1YiI6IjY1YTY2YzBhZWI2NGYxMDEyYWY1MTVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yTqFum0ww3acgQ5KnQ7zg4AuPkZ4w7xoQdmO9mxL8iM";
        const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;

        const requestData = {
          media_type: 'tv',
          media_id: mediaId,
          watchlist: true,
        };

        const response = await axios.post(apiUrl, requestData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        console.log(response.data);

        this.watchlistSuccess = true;

        setTimeout(() => {
          this.watchlistSuccess = false;
        }, 2000);

      } catch (error) {
        console.error('Error adding to watchlist', error);
      }
    }, 
  },
};
</script>

<style scoped>

.top .columns .column img{
	width: 100%;
	height: 600px;
	-o-object-fit: cover;
	object-fit: cover;
	-o-object-position: top;
	object-position: top;
}

.success-message {
  position: fixed;
  top: 10px;
  right: 0;
  padding: 10px;
  margin: 10px;
  background-color: #00cc00;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

</style>
