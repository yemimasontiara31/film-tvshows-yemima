<template>
  <div class="movie-detail">
    <div class="top-details z-0">
      <div class="columns">
        <div class="column relative is-full featured_wrapper p-0">
          <img
            v-if="movieDetails"
            :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + movieDetails.backdrop_path"
            class="featured w-full"
          >

          <div v-if="movieDetails.vote_average > 7 && movieDetails.vote_count > 1000" class="mt-2 text-lightblue absolute top-[20px] right-[30px] rounded-lg bg-blue1 p-[10px]">
            Recommended
          </div>

          <div class="title_wrapper absolute top-[100px] right-[10%] xl:right-[20%]" v-if="movieDetails">
            <h1 class="text-red font-bold text-6xl">{{movieDetails.original_title}}</h1>
            <h2 class="title text-white mt-[-10px]">{{movieDetails.original_title}}</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="container grid sm:flex px-[20px] sm:px-[80px] gap-5 sm:gap-20 mb-[60px]">
      <div class="poster-movies mt-[-80px] z-40 flex justify-center">
        <img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + movieDetails.poster_path" class="h-[450px] rounded-lg ">
      </div> 

      <div class="w-[100%] sm:w-[50%] mt-[20px]">
        <h1 class="text-6xl">{{ movieDetails.original_title }}</h1>
        <p class="mt-2">{{movieDetails.release_date}}</p>
        <p class="text-blue1">{{movieDetails.tagline}}</p>
        <p class="mt-5">{{ movieDetails.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movieDetails: {},
    };
  },

  mounted() {
    this.fetchMovieDetails();
  },

  methods: {
    async fetchMovieDetails() {
      try {
        const movieId = this.$route.params.id;
        const apiKey = "9297a0142ee75d6aff6b4a81e87ef6d4";
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

        const response = await axios.get(apiUrl);
        this.movieDetails = response.data;

        console.log(this.movieDetails);
      } catch (error) {
        console.error('Error fetching movie details', error);
      }
    },
  },
};
</script>

<style scoped>
.top-details .columns .column img{
	width: 100%;
	height: 600px;
	-o-object-fit: cover;
	object-fit: cover;
	-o-object-position: top;
	object-position: top;
}
</style>
