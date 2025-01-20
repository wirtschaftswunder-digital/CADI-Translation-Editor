export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  target: 'static',
  mode: 'spa',

  head: {
    script: [{ src: 'https://code.jquery.com/jquery-3.6.0.min.js' }]
  },

  router: {
    base: process.env.ROUTER_BASE || '/CADI-Translation-Editor/'
  },

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
    position: 'bottom-right',
    duration: 5000
  },

  components: {
    dirs: ['~/components']
  },

  modules: ['@nuxtjs/axios', '@nuxtjs/toast']
}
