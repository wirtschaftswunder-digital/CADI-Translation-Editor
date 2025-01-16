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

  build: {
    publicPath:
      process.env.NODE_ENV === 'production'
        ? process.env.HOSTING_URL ||
          'https://leon-1207.github.io/CADI-Translation-Editor'
        : undefined
  },

  components: {
    dirs: ['~/components']
  },

  modules: ['@nuxtjs/axios']
}
