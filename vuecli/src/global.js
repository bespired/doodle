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

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

String.prototype.camelcase = function() {
	return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
		return index === 0 ? word.toLowerCase() : word.toUpperCase();
	}).replace(/\s+/g, '');
},

String.prototype.pascalcase = function() {
	return this.split('-').map(function(word,index){
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}).join('');
}