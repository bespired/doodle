/* eslint-disable */
import Vue         from 'vue'
import Router      from 'vue-router'
import store       from './store'
import auth        from './auth'

import mainRoutes   from './routes/main.js'
import indexRoutes  from './routes/index.js'
import DoodleRoutes from './doodledesign/routes/doodles.js'


Vue.use(Router)

let router = new Router({
    base: '/admin',
    mode: 'history',
    routes: [],
})

router.addRoutes(mainRoutes)
router.addRoutes(indexRoutes)
router.addRoutes(DoodleRoutes)


router.beforeEach((to, from, next) => {

    document.title = 'Doodle'

    // if (to.name && to.name !== 'remotelogin') {
    //     auth.requireAuth(to, from, next)
    // }

    next()
})

export default router