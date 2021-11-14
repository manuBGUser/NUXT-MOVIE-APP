<template>
  <Loading v-if="$fetchState.pending" />

  <div v-else class="container movies">
    <div v-if="count > 0">
      <b-message class="message" type="is-white">
          <div class="columns is-mobile">
          <div class="column"><h3 class="h3-total">Total of movies: {{count}}</h3></div>
          <div class="column">
            <h3 class="h3-pay">Amount: 
              {{
                  amount.toLocaleString('en-us', { 
                  style: 'currency',
                  currency: 'USD',   
                  })
              }}
            </h3>
          </div>
          <div class="column centered-button">
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
    </div>
    
    <div id="movie-grid" class="movies-grid">
      <Movie 
         v-for="(movie, index) in movies"
        :key="index"
        :movie="movie.movie"
        :user="user"
        :index="false"
      />
      </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data(){
    return {
      val: 0,
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
    const movies = this.$store.state.cart.movies
        
        if (this.$fire.auth.currentUser != null) {
          let uid = this.$fire.auth.currentUser.uid
          for (let index = 0; index < movies.length; index++) {
            let a = 0
            const movie = movies[index];
            // console.log(movie)
          
            if (movie.uid === uid) {
              this.getSingleMovie(movie.movie.id).then(result => {
                let x = 1
                for (let i = 0; i < result.revenue.toString().length-1; i++) {
                  x = x*10
                }
                let val = result.revenue/x
                console.log(val)
                this.val += val
                let amount = this.val
                this.$store.commit('cart/updateAmount', { amount })
              })
              

            }
           
          }
        
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
            const data = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=093fe08de240901010beac682eac60f5&language=en-US`)

            const result = await data
            return result.data
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
    .message{
      margin-bottom: 15px;
    }
    .h3-pay{
      margin-top: 8px;
      margin-bottom: 8px;
      // padding-left: 250px;
      color:  #211f1f;
      font-size: 30px;
      text-align: center;
    }
    .h3-total{
      margin-top: 8px;
      margin-bottom: 8px;
      color:  #211f1f;
      font-size: 30px;
      text-align: center;
    }
    .container {
        // height: 200px;
      position: relative;
    }
    .center {
      margin: 0;
      position: absolute;
      top: 50%;
      left: 40%;
      margin-top: 30px;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .button-pay{
      width: 150px;
    }
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
          
          
        }
      }
    }
  }

</style>