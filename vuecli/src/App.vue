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

export default {
    name: 'app',

    mounted() {
        /*
        this.$store.dispatch('pusher/setAppKey', {
            appkey  : process.env.VUE_APP_PUSHER_APP_KEY,
            channel : 'tool-cyclone',
            event   : 'message'
        })
        */
    },
}
</script>