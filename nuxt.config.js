export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    target: "static",
    mode: "spa",

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