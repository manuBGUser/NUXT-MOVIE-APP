<template>
  <!-- <Loading v-if="$fetchState.pending" /> -->
  <b-loading v-if="isLoading" :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>  <!-- v-if="$fetchState.pending"  -->

  <div v-else class="container movies">
    <b-message class="message" type="is-white">
      <div class="columns is-mobile">
        <div class="column"><h3 class="h3-total">Total of movies: {{count}}</h3></div>
        <div class="column">
          <h3 class="h3-total">Amount: 
            {{
                amount.toLocaleString('en-us', { 
                style: 'currency',
                currency: 'USD',   
                })
            }}
          </h3>
        </div>
        <div class="column">
          <nuxt-link  to="/checkout">
            <div class="container">
              <div class="center">
                <b-button class="button-pay" type="is-success" size="is-medium">Pay</b-button>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </b-message>
    
    <div>
      <div class="columns is-mobile is-multiline">
        <Movie
        class="column is-3"
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie.movie"
        :user="user"
        :index="false"
        />
      </div>
      
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      val: 0,
      user: this.$fire.auth.currentUser,
      isLoading: false,
      isFullPage: true
    }
  },
  mounted(){
    this.$fire.auth.onAuthStateChanged(user => {
        console.log(user)
        this.user = user
    })
  },
  async fetch(){
    const movies = this.$store.state.cart.movies
        
      if (this.$fire.auth.currentUser != null) {
        this.isLoading = true
        let uid = this.$fire.auth.currentUser.uid
        for (let index = 0; index < movies.length; index++) {
          let a = 0
          const movie = movies[index];
        
          if (movie.uid === uid) {
            this.getSingleMovie(movie.movie.id).then(result => {
              let x = 1
              for (let i = 0; i < result.revenue.toString().length-1; i++) {
                x = x*10
              }
              let val = result.revenue/x
              this.val += val
              let amount = this.val
              this.$store.commit('cart/updateAmount', { amount })
            })
          }
        }
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      }
  },
  fetchDelay: 1000,
  computed: {
      movies () {
          return this.$store.state.cart.movies
      }, 
      amount(){
        return this.$store.state.cart.amount
      },
      count(){
        let count = 0
        const movies = this.$store.state.cart.movies
        if (this.$fire.auth.currentUser != null) {

          let uid = this.$fire.auth.currentUser.uid
          console.log(movies)
          movies.forEach(movie => {
            if (movie.uid === uid) {
              count++
            }
          });
          
        }
        return count
      }
  },
  methods:{
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
    },
  }
 
}
</script>