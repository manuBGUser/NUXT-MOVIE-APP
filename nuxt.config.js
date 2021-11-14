export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'NUXT-MOVIE-APP',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/defaults.scss' 
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
  ],

  router: {
    middleware: ['auth']
  },

  // fontawesome: {
  //   icons: {
  //     solid: true,
  //     brands: true
  //   }
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-buefy',
    ['@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAe5x6mvjQ2p1sK5OK4K-_gMzT5wpGHMf8",
          authDomain: "nuxt-movie-app-firstproject.firebaseapp.com",
          projectId: "nuxt-movie-app-firstproject",
          storageBucket: "nuxt-movie-app-firstproject.appspot.com",
          messagingSenderId: "302878632656",
          appId: "1:302878632656:web:7719779bae23f407188cd5" 
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
            ssr: false, // default

          }
          
        }
      }
    ],
    // '@nuxtjs/fontawesome',
    //OR like this
    // ['@nuxtjs/fontawesome', {
    //   component: 'fa', 
    //   imports: [
    //     //import whole set
    //     {
    //       set: '@fortawesome/free-solid-svg-icons',
    //       icons: ['fas']
    //     },
    //     // //import 2 icons from set 
    //     // // please note this is PRO set in this example, 
    //     // // you must have it in your node_modules to actually import
    //     // {
    //     //   set: '@fortawesome/pro-regular-svg-icons',
    //     //   icons: ['faAdjust', 'faArchive']
    //     // }
    //   ]
    // }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
