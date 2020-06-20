<template>
    <div id="app">
        <app-header />
        <router-view   />
        <confirm-modal ref="confirm" />
        <login-modal   ref="login"   />
        <alert-modal   ref="alert"   />
    </div>
</template>

<script>

import auth from '@/auth'

export default {
    name: 'app',
    created() {
        window.addEventListener('focus', this.authCheck)
    },
    destroyed() {
        window.removeEventListener('focus', this.authCheck)
    },
    mounted() {
        /*
        this.$store.dispatch('pusher/setAppKey', {
            appkey  : process.env.VUE_APP_PUSHER_APP_KEY,
            channel : 'tool-cyclone',
            event   : 'message'
        })
        */
    },

    methods:{
        authCheck(){
            console.log('focus')
        }
    }
}
</script>