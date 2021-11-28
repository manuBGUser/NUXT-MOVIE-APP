<template>
    <b-loading v-if="isLoading" :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>  <!-- v-if="$fetchState.pending"  -->

    <div v-else class="columns is-mobile container single-movie">
      <div class="column">
        <NuxtLink class="button" :to=" $route.params.index ? {name: 'index'} : {name: 'cart'}">Back</NuxtLink>
        <div class="columns is-mobile">
          <div class="column is-4">
            <figure class="is-4by3">
              <b-image
                :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                webp-fallback=".jpg"
                ratio="2by3"
              ></b-image>
            </figure>
          </div>
          <div class="column is-8">
              <div><h2 class="title is-2 has-text-white display">Title:</h2><h2 class="title is-2 has-text-white display"> {{movie.title}}</h2></div>
              <div class="pt-3"><p class="title is-4 has-text-white is-underlined display">Tagline:</p><p class="title is-4 has-text-white is-italic display"> "{{movie.tagline}}"</p></div>
              <div class="pt-3"><p class="title is-4 has-text-white is-underlined display">Released:</p><p class="title is-4 has-text-white display"> {{
                      new Date(movie.release_date).toLocaleString('en-us', { 
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',    
                      })
                  }}
                </p>
              </div>
              <div class="pt-3"><p class="title is-4 has-text-white is-underlined display">Duration:</p><p class="title is-4 has-text-white display"> {{movie.duration}} minutes</p></div>
              <div class="pt-3"><p class="title is-4 has-text-white is-underlined display">Revenue:</p><p class="title is-4 has-text-white display"> {{
                    movie.revenue.toLocaleString('en-us', { 
                    style: 'currency',
                    currency: 'USD',   
                    })
                  }}
                </p>
              </div>
              <div class="pt-3"><p class="title is-4 has-text-white is-underlined display">Overview:</p><p class="title is-4 has-text-white display"> {{movie.overview}}</p></div>
              <div class="pt-3"><p class="title is-4 has-text-white is-underlined display">Price:</p><p class="title is-4 has-text-white display"> {{
                    price.toLocaleString('en-us', { 
                    style: 'currency',
                    currency: 'USD',   
                    })
                  }}
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "single-movie",
    head(){
        return {
        }
    },
    data(){
        return {
            movie: '',
            price: 0,
            isLoading: false,
            isFullPage: true
        }
    },
    async fetch(){
      await this.getSingleMovie()

    },
    methods: {
      async getSingleMovie(){
        this.isLoading = true

        let movie = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.$route.params.movieId}?api_key=093fe08de240901010beac682eac60f5&language=en-US`)
        .then(function( response ){
            return response;
        })
        .catch(err => {
          console.log('fail');
          console.log(err)
        })
        this.movie = movie
        let x = 1
        for (let i = 0; i < movie.revenue.toString().length-1; i++) {
          x = x*10
        }
        let amount = movie.revenue/x;
        this.price = amount
        this.isLoading = false
      }
  }
}
</script>
