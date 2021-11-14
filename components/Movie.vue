<template>
  <div class="movie">
    <div class="card-image">
      <figure class="is-4by3 movie-img">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="" /> 
            <p class="review">{{movie.vote_average}}</p>
            <p class="overview">{{movie.overview.slice(0,700)}}<span v-if="movie.overview.length > 700">...</span></p>
      </figure>
    </div>
    <div class="">
      <div class="info">
        <p class="title">{{movie.title.slice(0,25)}}<span v-if="movie.title.length > 25">...</span></p>
        <p class="release">Release:
          <time> {{
              new Date(movie.release_date).toLocaleString('en-us', { 
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              })
          }}</time><span><p class="revenue">
          {{
            price.toLocaleString('en-us', { 
            style: 'currency',
            currency: 'USD',   
            })
          }}
        </p></span>
        </p>
        
        <NuxtLink class="button button-light" :to="{name: 'movies-movieId', params: {movieId: movie.id, index: index}}">Get More Info</NuxtLink>
        <a v-if="user != null && index" @click="addMovie(movie)" class="button button-light button-r">
            Add To Cart
        </a>  
        <a v-if="user != null && !index" @click="removeMovie(movie)" class="button button-light button-r">
            Remove Movie
        </a> 
              
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['movie', 'user', 'index'],
    data(){
      return {
        price: 0
      }
    },
    async fetch(){
      this.getSingleMovie(this.movie.id).then(result => {
        let x = 1
        for (let i = 0; i < result.revenue.toString().length-1; i++) {
          x = x*10
        }
        let amount = result.revenue/x;
        this.price = amount
        console.log(this.price)
        return
      })
    },
    methods:{
        addMovie(movie) {
            let uid = this.$fire.auth.currentUser.uid
            this.$store.commit('cart/addMovie', { movie,  uid})
            this.$store.commit('cart/increase')
        },
        removeMovie (movie) {
          this.$store.commit('cart/removeMovie', { movie })
          let amount = this.price
          this.$store.commit('cart/decreseAmount', { amount })
             
        },
        async getSingleMovie(id){
            const data = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=093fe08de240901010beac682eac60f5&language=en-US`)

            const result = await data
            return result.data
        }
    }
}
</script>

<style lang="scss" scoped>
.movie {
        position: relative;
        display: flex;
        flex-direction: column;
        .movie-img {
          position: relative;
          overflow: hidden;
          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }
        .info {
          margin-top: auto;
          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }
          .button {
            margin-top: 8px;
          }
          .button-r{
            float: right;
          }
          .revenue{
            color: white;
            float: right;
            font-size: 16px;
          }
        }
      }
</style>