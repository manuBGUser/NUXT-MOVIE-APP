const mutations = {
    addMovie(state, {movie, uid}){
        state.movies.push({
            movie,
            uid,
        })
    },
    removeMovie(state, {movie}){
        let movieState = null
        state.movies.forEach(element => {
            if (element.movie === movie) {
                movieState = element
                state.movies.splice(state.movies.indexOf(movieState), 1)
                // break
            }
        });
        
    },
    increase(state){
        state.count++
    },
    deleteUserMovies(state, {uid}){
        for (let i = 0; i < state.movies.length; i++) {
            const element = state.movies[i];
            if (element.uid === uid) {
                state.movies.splice(state.movies.indexOf(element.movie), 1)
                state.count--
                i--
            }
        }
    },
    updateAmount(state, {amount}){
        state.amount = amount
    },
    decreseAmount(state, {amount}){
        state.amount -= amount
    }
}

const state = () => ({
    movies: [],
    count: 0,
    amount: 0
})

const getters = {
    getMovies(state){
        return state.movies
    },
}

export default {
    state,
    mutations,
    getters
}