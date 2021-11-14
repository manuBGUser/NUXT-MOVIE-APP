<template>
    <Loading v-if="$fetchState.pending" />

    <div v-else class="container single-movie">
        <NuxtLink class="button" :to=" $route.params.index ? {name: 'index'} : {name: 'cart'}">Back</NuxtLink>
        <div class="movie-info">
            <div class="movie-img">
                <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="">
            </div>
            <div class="movie-content">
                <h1>Title: {{movie.title}}</h1>
                <p class="movie-fact tagline ">
                    <span>Tagline: </span>"{{movie.tagline}}"
                </p>
                <p class="movie-fact">
                    <span>Released:</span>
                    {{
                        new Date(movie.release_date).toLocaleString('en-us', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',    
                        })
                    }}
                </p>
                <p class="movie-fact">
                    <span>Duration: </span>{{movie.duration}} minutes
                </p>
                <p class="movie-fact">
                    <span>Revenue: </span>
                    {{
                        movie.revenue.toLocaleString('en-us', { 
                        style: 'currency',
                        currency: 'USD',   
                        })
                    }}
                </p>
                <p class="movie-fact">
                    <span>Overview: </span>{{movie.overview}}
                </p>
                <p class="movie-fact">
                    <span>Price: </span>{{
                                            price.toLocaleString('en-us', { 
                                            style: 'currency',
                                            currency: 'USD',   
                                            })
                                          }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "single-movie",
    head(){
        return {
            title: this.movie.title,
        }
    },
    data(){
        return {
            movie: '',
            price: 0
        }
    },
    async fetch(){
        await this.getSingleMovie()  
    },
    fetchDelay:1000,
    methods: {
        async getSingleMovie(){
            const data = axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.movieId}?api_key=093fe08de240901010beac682eac60f5&language=en-US`)

            const result = await data
            console.log(result.data)
            this.movie = result.data
            let x = 1
            for (let i = 0; i < result.data.revenue.toString().length-1; i++) {
              x = x*10
            }
            let amount = result.data.revenue/x;
            this.price = amount
        }
    }
}
</script>

<style lang="scss" scoped>
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .movie-img {
      img {
        max-height: 500px;
        width: 100%;
        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }
    .movie-content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }
      .movie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;
        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }
      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>