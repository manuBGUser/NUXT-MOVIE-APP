<template>
    <b-navbar fixed-top >
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJs-Qx2U6rHRD-IvVfDsypSMiGVstYaQj9H0aGUJ4aQ&s"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <p class="email" v-if="user">{{user.email}}</p>
                    <nuxt-link v-if="!user" class="button" to="/signup">Sign up</nuxt-link>

                    <nuxt-link v-if="!user" class="button is-light" to="/login">Sign In</nuxt-link>
                  
                    <a v-if="user" @click="logout" class="button is-light">
                        Logout
                    </a> 
                    <nuxt-link class="button is-light" to="/cart">Cart</nuxt-link>

                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>


<script>
export default {
    data(){
        return {
            user: '',
        }
    },
    mounted(){
        this.$fire.auth.onAuthStateChanged(user => {
            // console.log(user)
            this.user = user
        })
    },
    methods:{
        logout(){
            let uid = this.$fire.auth.currentUser.uid
            this.$fire.auth.signOut().then(result => {
                this.user = '';
                this.$store.commit('cart/deleteUserMovies', {uid})
                this.$router.push('/')

            })
           
        },
    }
}
</script>
