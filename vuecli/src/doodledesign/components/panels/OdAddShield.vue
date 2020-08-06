<template>
	<div>
		<od-flex v-if="mode==='button'">
		<od-button @click="mode='input'" class="left-icon action right-align" icons="plus">Add</od-button>
		</od-flex>
		<od-flex v-if="mode==='input'" >
			<od-text-input
				@clear ="clear"
				vmodel="newName" postfix="create" action="action" clearaction="clear" :clear="true" :label="label" />
		</od-flex>
	</div>
</template>
<script>
export default {

	name: 'od-add-shield',

 	props: {
        vmodel:       { type: String,  default: null  },
        smodel:       { type: String,  default: null  },
        label:        { type: String,  default: null  },
    },

    data(){
    	return {
    		newName : '',
    		mode: 'button'
    	}
    },

    methods:{
    	action(){
    		if (this.newName === '') return
    		this.newName = this.capitalize(this.newName.trim())
    		this.$emit('create', this.newName )
    		this.mode    = 'button'
    		this.newName = ''
    	},
    	clear(){
    		this.mode    = 'button'
    		this.newName = ''
    	},

    }

}
</script>