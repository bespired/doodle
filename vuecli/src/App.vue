<template>
    <div id="app">
        <doodle-header />
        <router-view   />
        <confirm-modal ref="confirm" />
        <login-modal   ref="login"   />
        <alert-modal   ref="alert"   />
    </div>
</template>

<script>

import DoodleHeader  from '@/components/DoodleHeader';

export default {
    name: 'app',

	components: {
		DoodleHeader
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
}
</script>