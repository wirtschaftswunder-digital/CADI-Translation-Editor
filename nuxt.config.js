export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    target: "static",
    mode: "spa",

    head: {
        script: [
            { src: 'https://code.jquery.com/jquery-3.6.0.min.js' }
        ]
    },

    router: {
        base: '/CADI-Translation-Editor/'
    },

    // Allows page refresh to work on github pages
    generate: {
        fallback: "404.html"
    },

    components: {
        dirs: [
            '~/components',
        ]
    },

    modules: ['@nuxtjs/axios']
}  