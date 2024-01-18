<template>
  <div class="mb-[300px]">
    <div class="top-details z-0">
      <div class="columns">
        <div class="column relative is-full featured_wrapper p-0">
          <img
            v-if="tvDetails"
            :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + tvDetails.backdrop_path"
            class="featured w-full"
          >

          <div v-if="tvDetails.vote_average > 8 && tvDetails.vote_count > 1000" class="mt-2 text-lightblue absolute top-[20px] right-[30px] rounded-lg bg-blue1 p-[10px]">
            Recommended
          </div>

          <div class="title_wrapper absolute top-[100px] right-[20%]" v-if="tvDetails">
            <h1 class="text-red font-bold text-6xl">{{tvDetails.name}}</h1>
            <h2 class="title text-white mt-[-10px]">{{tvDetails.name}}</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="container px-[80px] mx-auto pb-[50px] z-40">
      <div class="poster-tv absolute bottom-[-150px]">
        <img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + tvDetails.poster_path" class="h-[450px] rounded-lg ">
      </div> 

      <div class="px-[50px] mt-5 mb-[100px] mx-auto absolute left-[30%] w-[65%]">
        <h1 class="text-6xl">{{ tvDetails.name }}</h1>

        <div class="mt-5 flex gap-4">
          <p class="text-gray3">First Air Date: {{tvDetails.first_air_date}}</p>
          <p> || </p>
          <p class="text-gray3">Last Air Date: {{tvDetails.last_air_date}}</p>
        </div>
      
        <p class="text-blue1">{{tvDetails.tagline}}</p>
        <p class="mt-5">{{ tvDetails.overview }}</p>
      </div>
    </div> 

    <!-- <div class="container px-[50px] mx-auto absolute left-[50%] w-[50%]">
      <h1 class="text-6xl">{{ tvDetails.original_title }}</h1>
      <p class="mt-5">{{ tvDetails.overview }}</p>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tvDetails: {},
    };
  },

  mounted() {
    this.fetchTVDetails();
  },

  methods: {
    async fetchTVDetails() {
      try {
        const seriesId = this.$route.params.id;
        const apiKey = "9297a0142ee75d6aff6b4a81e87ef6d4";
        const apiUrl = `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}`;

        const response = await axios.get(apiUrl);
        this.tvDetails = response.data;

        console.log(this.tvDetails);
      } catch (error) {
        console.error('Error fetching tv shows details', error);
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
