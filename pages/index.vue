<template>
<div class="home">
  <Hero />

  <div class="container search">
    <input class="input is-normal" @keyup.enter="searchMovies" type="text" name="" placeholder="Search" id="" v-model.lazy="searchInput">
    <b-button @click="cleanSearch" v-show="searchInput !== ''">Clear Search</b-button>
    <!-- <b-button @click="clickMe">Click Me</b-button> -->
  </div>

  <b-loading v-if="isLoading" :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false"></b-loading>  <!-- v-if="$fetchState.pending"  -->
  <!-- <Loading v-if="$fetchState.pending" /> -->

  <div v-else class="container">
    <div v-if="searchInput !== ''" id="movie-grid">
      <div class="columns is-mobile is-multiline">
        <Movie
          class="column is-3"
          v-for="(movie, index) in searchedMovies"
          :key="index"
          :movie="movie"
          :user="user"
          :index="true"
        />
      </div>
      
    </div>
    <div v-else id="movie-grid">
      <div class="columns is-mobile is-multiline">
        <Movie 
          class="column is-3"
          v-for="(movie, index) in movies"
          :key="index"
          :movie="movie"
          :user="user"
          :index="true"
        />
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  head(){
    return {
      title: 'Movie App - Latest Streaming Info',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the latest streaming movies in theaters & online'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, streaming'
        },
      ]
    }
  },
  data(){
    return {
      movies: [],
      searchInput: '',
      searchedMovies: [],
      user: this.$fire.auth.currentUser,
      isLoading: false,
      isFullPage: true
    }
  },
   mounted(){
        this.$fire.auth.onAuthStateChanged(user => {
            this.user = user
        })
    },
  async fetch(){
    // fetch(){
    // if(this.searchInput === ''){
      await this.getMovies()
      return
    // }
    // await this.searchMovies() 
      //  this.getMovies()
      //  console.log(this.movies)
  },
  // fetchDelay: 1000,
  methods: {
    // async getMovies(){

    //   const data = axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=093fe08de240901010beac682eac60f5&language=en-US&page=1')
    //   const result = await data
    //   result.data.results.forEach(movie => {
    //     this.movies.push(movie)
    //   });
    //   //             this.isLoading = true

    //   // setTimeout(() => {
    //   //   this.isLoading = false
    //   // }, 500)
    // },
    async getMovies(){
      this.isLoading = true

      let movies = await this.$axios.$get('https://api.themoviedb.org/3/movie/now_playing?api_key=093fe08de240901010beac682eac60f5&language=en-US&page=1')
      .then(function( response ){
          return response.results;
      })
      .catch(err => {
        console.log('fail');
        console.log(err)
        return []
      })
      if(movies.length > 0)
        movies.forEach(movie => {
          this.movies.push(movie)
        });

      // setTimeout(() => {
        this.isLoading = false
      //                 // console.log(this.movies)

      // }, 500)
    },
    async searchMovies(){
      this.isLoading = true
      let movies = await this.$axios.$get(`https://api.themoviedb.org/3/search/movie?api_key=093fe08de240901010beac682eac60f5&language=en-US&page=1&query=${this.searchInput}`)
      .then(function( response ){
          return response.results;
      })
      .catch(err => {
        console.log('fail');
        console.log(err)
        return []
      })
      if(movies.length > 0)
        movies.forEach(movie => {
          this.searchedMovies.push(movie)
        });
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    cleanSearch(){
      this.searchedMovies = []
      this.searchInput = ''
    }
  }
}
</script>