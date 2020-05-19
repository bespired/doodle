/* eslint no-useless-escape: 0 */  // --> OFF
import Vue from 'vue'
export default {

	set(key, data){
		localStorage.setItem(`doodle.${key}`, JSON.stringify(data));
	},

	get(key, defaulty){
		const value = localStorage.getItem(`doodle.${key}`);
		if (value === undefined ) return defaulty
		return JSON.parse(value)
	},

};
