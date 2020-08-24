/* eslint-disable no-alert, no-console */
<template>
	<div class="input-select-group" :class="prefixer()">

		<label :for="$options.namedId" v-if="label">
			{{ label }}
		</label>
		<span class="prefix" v-if="prefix!==null">{{ prefix }}</span>

		<!-- <array-value  :options="lOptions" v-if="selecttype=='array-value'"  /> -->
		<component :is="selecttype"

			:options     = "lOptions"
			:placeholder = "placeholder"
			:vmodel      = "vmodel"
			:smodel      = "smodel"
			:required    = "required"

			@changed     = "changed"
			:key         = "modelChange"
			:key-data    = "modelChange"
		/>

	</div>
</template>
<script>

import Helpers     from '../../helpers/helpers.js'
import Multiselect from "vue-multiselect"
import Vue         from 'vue'

import ArrayValue  from './OdSelectArrayValue'
import ArrayObject from './OdSelectArrayObject'
import ObjectValue from './OdSelectObjectValue'

export default {
	name: 'od-select',

	components: {
		Multiselect, ArrayValue, ArrayObject, ObjectValue
	},

	props: {
		options:      { }, // Array, null or undefined...
		placeholder:  { type: String,  default: null  },
		vmodel:       { type: String,  default: null  },
		smodel:       { type: String,  default: null  },
		soptions:     { type: String,  default: null  },
		label:        { type: String,  default: null  },
		prefix:       { type: String,  default: null  },
		minWidth:     { type: String,  default: null  },
		required:     { type: Boolean, default: false },
		single:       { type: String,  default: null  },
		list:         { type: String,  default: null  },
	},

//


	data() {
		let vparent = this.$parent
		if (this.vmodel){ vparent = Helpers.findParent(this.$parent, this.vmodel) }

		return {
			lOptions  : this.localOptions(),
			selecttype: this.localType(),
			vparent   : vparent,
		}
	},

	computed:{

		modelChange(){
			let value = 0
			// if ( this.smodel ) value = this.$store.getters['doodlegui/getSelectValue'](this.smodel)
			if ( this.smodel ) value = this.$store.getters['doodlegui/getStoreValue'](this.smodel)
			if ( this.vmodel ) value = Helpers.dotget(this.vparent, this.vmodel)

			return Helpers.keyify(this.$options.namedId, value)
		}

	},

	methods: {
		prefixer() {
			let prefixer = this.prefix  === null ? 0 : this.prefix.length
			let prefixLength = Math.max(this.minWidth, Math.ceil(prefixer / 3))
			return this.prefix  === null ? '' : 'prefix prefix-' + prefixLength
		},

		localOptions(){
			let loptions = this.options
			if (this.soptions) loptions= this.$store.getters['doodlegui/getSelectOptions'](this.soptions)
			return loptions
		},

		localType(){
			let loptions = this.localOptions()
			if ( !Array.isArray(loptions) ){
				// implement pick from Object ...
				return ''
			}

			// is it Array of values or Array of Objects ?
			let firstKey = Object.keys(loptions)[0]
			let firstElm = loptions[firstKey]

			if ( firstElm.hasOwnProperty('id') )    return 'array-object'
			if ( firstElm.hasOwnProperty('value') ) return 'array-object'

			return 'array-value'
		},

		changed(value){
			console.log('pass on changed', value)
			this.$emit('changed', value)
		},
	},


}
</script>