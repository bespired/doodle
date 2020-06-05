/* eslint-disable */
import Vue  from 'vue'
import auth from './auth'

global.loadView = function(view) {
    return () => import(/* webpackChunkName: "[index]" */ `@/views/${view}.vue`)
}
global.loadDoc = function(view) {
    return () => import(/* webpackChunkName: "[index]" */ `@/doodledesign/docs/${view}.vue`)
}
global.loadDrag = function(view) {
    return () => import(/* webpackChunkName: "[index]" */ `@/doodledragrr/views/${view}.vue`)
}

global.axios = require('axios');

global.axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${auth.getToken()}`
    return config;
});

Vue.prototype.global = global