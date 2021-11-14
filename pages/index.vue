<template>
<div class="home">
  <Hero />

  <div class="container search">
    <input @keyup.enter="$fetch" type="text" name="" placeholder="Search" id="" v-model.lazy="searchInput">
    <button @click="cleanSearch" v-show="searchInput !== ''" class="button">Clear Search</button>
  </div>

  <Loading v-if="$fetchState.pending" />

  <div v-else class="container movies">
    <div v-if="searchInput !== ''" id="movie-grid" class="movies-grid">
      <Movie 
         v-for="(movie, index) in searchedMovies"
        :key="index"
        :movie="movie"
        :user="user"
        :index="true"
      />
    </div>
    <div v-else id="movie-grid" class="movies-grid">
      <Movie 
         v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
        :user="user"
        :index="true"
      />
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'

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
      user: this.$fire.auth.currentUser
    }
  },
   mounted(){
        this.$fire.auth.onAuthStateChanged(user => {
            console.log(user)
            this.user = user
        })
    },
  async fetch(){
    if(this.searchInput === ''){
      await this.getMovies()
      return
    }
    await this.searchMovies() 
       
  },
  fetchDelay: 1000,
  methods: {
    async getMovies(){
      const data = axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=093fe08de240901010beac682eac60f5&language=en-US&page=1')
      const result = await data
      result.data.results.forEach(movie => {
        this.movies.push(movie)
      });
    },
    async searchMovies(){
      const data = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=093fe08de240901010beac682eac60f5&language=en-US&page=1&query=${this.searchInput}`)
      const result = await data
      result.data.results.forEach(movie => {
        this.searchedMovies.push(movie)
      });

    },
    cleanSearch(){
      this.searchedMovies = []
      this.searchInput = ''
    },
  }
}
</script>

<style lang="scss">
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }

 .search {
    display: flex;
    padding: 32px 16px;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      
    }
  }

</style>