export default [
    {
        path: '/',
        name: 'home',
        component: global.loadView('Home'),
    },
    {
        path: '/about',
        name: 'about',
        component: global.loadView('About'),
    },
    {
        path: '/remotelogin',
        name: 'remotelogin',
        props: (route) => ( { intended: route.query.intended }),
        component: global.loadView('RemoteLogin'),
    },

]

