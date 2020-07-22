/* eslint no-useless-escape: 0 */  // --> OFF
import Vue from 'vue'
export default {

	clone(data){
		if (data === null) return null
		if (data === undefined) return undefined
		return JSON.parse(JSON.stringify(data))
	},

	uuid(str)
	{
		let prefix = ''
		if ( str !== undefined)
			prefix = str.toLowerCase() + '-'

		return prefix + Math.ceil(1e9 * Math.random()).toString(36).substr(-5)
	},

	labelize(name){
		return name.replace('_', ' ');
	},

	dotget(root, prop)
	{
		let dots= (prop.match(/\./g) || []).length
		if (!dots) return root[prop];
		let parts= prop.split('.')
		for (var i = parts.length - 1; i >= 0; i--) {
			if (parts[i].substr(0,1) === '$'){
				const varname= parts[i].substr(1)
				parts[i]=root[varname]
			}
		}
		if (dots === 1) return root[parts[0]][parts[1]]
		if (dots === 2) return root[parts[0]][parts[1]][parts[2]]
		if (dots === 3) return root[parts[0]][parts[1]][parts[2]][parts[3]]
		if (dots === 4) return root[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]]
		if (dots === 5) return root[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[4]]
	},

	dotset(root, prop, value)
	{
		let dots= (prop.match(/\./g) || []).length
		if (!dots) { Vue.set(root, prop, value); return }
		let parts= prop.split('.')
		for (var i = parts.length - 1; i >= 0; i--) {
			if (parts[i].substr(0,1) === '$'){
				const varname= parts[i].substr(1)
				parts[i]=root[varname]
			}
		}
		if (dots === 1) { root[parts[0]][parts[1]] = value; return }
		if (dots === 2) { root[parts[0]][parts[1]][parts[2]] = value; return }
		if (dots === 3) { root[parts[0]][parts[1]][parts[2]][parts[3]] = value; return }
		if (dots === 4) { root[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]] = value; return }
		if (dots === 5) { root[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]] = value; return }
	},

	capitalize(str) {
  		return str.charAt(0).toUpperCase() + str.slice(1)
	},

	camelcase(str) {
  		return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    		return index === 0 ? word.toLowerCase() : word.toUpperCase()
  		}).replace(/\s+/g, '')
	},

	pascalcase(str) {
		return str.split('-').map(function(word,index){
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		}).join('')
	},


	slugify(str) {
		const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
		const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
		const p = new RegExp(a.split('').join('|'), 'g')

		return str.toString().toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, '') // Trim - from end of text
	}


};
