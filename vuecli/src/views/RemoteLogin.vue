<template>
    <div class="login">
        <login-modal ref="loginmodel"></login-modal>
    </div>
</template>
<script>

import auth from '@/auth'

export default {
    name: 'remote-login',
    props: {
        intended: String
    },

    mounted() {

        let authRoute = '/_/auth/v1/login'

        this.$refs.loginmodel.open(authRoute)
            .then((credentials) => {

                auth.setToken(
                    credentials.access_token,
                    credentials.expires_in + Date.now(),
                )

                const intended = decodeURIComponent(this.intended || '/')

                if ( window.location.href.indexOf('remotelogin') ){
                    let upto = window.location.href.indexOf('remotelogin')
                    window.location = window.location.href.substr(0, upto-1) + intended

                }else{
                    if ((intended.indexOf('http://')) || (intended.indexOf('https://'))) {
                        window.location = intended
                    } else {
                        window.location = '/admin/doodle' + intended
                    }
                }


        }, () => {

            window.location = '/admin/doodle'

        })
    }
}

</script>
