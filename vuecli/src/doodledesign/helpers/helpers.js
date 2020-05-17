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
		if (dots === 1) return root[parts[0]][parts[1]]
		if (dots === 2) return root[parts[0]][parts[1]][parts[2]]
		if (dots === 3) return root[parts[0]][parts[1]][parts[2]][parts[3]]
	},

	dotset(root, prop, value)
	{
		let dots= (prop.match(/\./g) || []).length
		if (!dots) { Vue.set(root, prop, value); return }
		let parts= prop.split('.')
		if (dots === 1) { root[parts[0]][parts[1]] = value; return }
		if (dots === 2) { root[parts[0]][parts[1]][parts[2]] = value; return }
		if (dots === 3) { root[parts[0]][parts[1]][parts[2]][parts[3]] = value; return }
	}
};
