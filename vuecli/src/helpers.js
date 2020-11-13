export default {

	clone(data) {
		if (data === null) return null
		if (data === undefined) return undefined
		return JSON.parse(JSON.stringify(data))
	},

    ucfirst(str){
    	return str.charAt(0).toUpperCase() + str.slice(1)
    },

}