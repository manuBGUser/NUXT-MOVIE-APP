export default function({app, route, redirect}){
    if(route.path === '/login'){
        if(!app.$fire.auth.currentUser){

        }
        else
            return redirect('/')
    }
}