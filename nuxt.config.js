export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    target: 'static',

    components: {
        dirs: [
            '~/components',
        ]
    },

    modules: ['@nuxtjs/axios']
}  