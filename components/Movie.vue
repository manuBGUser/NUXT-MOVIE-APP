<template>
  <section>
    <div class="card-image">
      <figure class="is-4by3 movie-img">
        <!-- <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="" />  -->
        <b-image
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          webp-fallback=".jpg"
          ratio="2by3"
        ></b-image>
        <p class="review">{{movie.vote_average}}</p>
        <p class="overview">{{movie.overview.slice(0,700)}}<span v-if="movie.overview.length > 700">...</span></p>
      </figure>
    </div>
    <div class="content">
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
  </section>
</template>

<script>
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
        // console.log(this.price)
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
            const data = this.$axios.$get(`https://api.themoviedb.org/3/movie/${id}?api_key=093fe08de240901010beac682eac60f5&language=en-US`)

            .then(function( response ){
                return response;
            })
            .catch(err => {
              console.log('fail');
              console.log(err)
            })
            return data
        }
    }
}
</script>