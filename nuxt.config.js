export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  target: 'static',
  mode: 'spa',

  head: {
    //script: [{ src: 'https://code.jquery.com/jquery-3.6.0.min.js' }]
    //script: [{ src: 'https://code.jquery.com/jquery-1.12.4.min.js' }]
  },

  router: {
    base: process.env.ROUTER_BASE || '/CADI-Translation-Editor/'
  },

  // serverMiddleware: [
  //   (req, res, next) => {
  //     res.setHeader('Access-Control-Allow-Origin', '*')
  //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  //     res.setHeader('Access-Control-Allow-Credentials', 'true')
  //     next()
  //   }
  // ],

  css: ['~/assets/css/main.css'],

  // Allows page refresh to work on github pages
  generate: {
    fallback: '404.html'
  },

  publicRuntimeConfig: {
    travelAppUrl: process.env.TRAVEL_APP_URL || 'http://localhost:3003'
  },

  build: {
    publicPath:
      process.env.NODE_ENV === 'production'
        ? process.env.HOSTING_URL ||
          'https://leon-1207.github.io/CADI-Translation-Editor'
        : undefined
  },

  toast: {
    position: 'bottom-left',
    duration: 5000
  },

  components: {
    dirs: ['~/components']
  },

  modules: ['@nuxtjs/axios', '@nuxtjs/toast']
}
