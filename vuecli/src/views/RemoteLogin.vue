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

        let authRoute = `${window.location.protocol}//${window.location.hostname}/api/login`

        this.$refs.loginmodel.open(authRoute)
            .then((credentials) => {

                console.log(credentials)

                auth.setToken(
                    credentials.token,
                    Date.now() + 57600 * 1000,
                )

                const intended =  localStorage.getItem('doodle.intended') || '/'
                localStorage.setItem('doodle.intended', '/');

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
