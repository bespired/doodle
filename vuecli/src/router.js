/* eslint-disable */
import Vue         from 'vue'
import Router      from 'vue-router'
import store       from './store'
import auth        from './auth'

import mainRoutes   from './routes/main.js'
import DoodleRoutes from './doodledesign/routes/doodles.js'
import DragrrRoutes from './doodledragrr/routes/dragrr.js'

Vue.use(Router)

let router = new Router({
    base: '/admin',
    mode: 'history',
    routes: [],
})

router.addRoutes(mainRoutes)
router.addRoutes(DragrrRoutes)
router.addRoutes(DoodleRoutes)

router.beforeEach((to, from, next) => {

    document.title = to.meta.title || 'Dragrr'
    if (to.name && to.name !== 'remotelogin') {
        auth.requireAuth(to, from, next)
    }

    next()
})

export default router