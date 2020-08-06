export default {

	clone(data) {
		if (data === null) return null
		if (data === undefined) return undefined
		return JSON.parse(JSON.stringify(data))
	},

    ucfirst(str){
    	return str.charAt(0).toUpperCase() + str.slice(1)
    },

    initClassTemplate(state, payload){
    	if ( state[`${payload.source}Templates`][payload.area] === undefined)
    	{
    		state[`${payload.source}Templates`][payload.area]  = null
    		state[`${payload.source}TemplateId`][payload.area] = null
    	}
    }

}