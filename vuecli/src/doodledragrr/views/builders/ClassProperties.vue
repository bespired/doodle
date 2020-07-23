<template>
	<section v-if="classTemplate">
		<od-text-input vmodel="classTemplate.label" label="label"/>
		<component :is="`class-properties-${classTemplate.area}`" />
	</section>
</template>
<script>

import Vue from 'vue';
import ClassPropertiesColor from './classbuilders/ClassPropertiesColor.vue'
import ClassPropertiesFont  from './classbuilders/ClassPropertiesFont.vue'
import ClassPropertiesSize  from './classbuilders/ClassPropertiesSize.vue'

export default {
	name: 'widget-properties',

	components: {
		ClassPropertiesColor, ClassPropertiesFont, ClassPropertiesSize
	},

	created() {
		this.$eventHub.$on('save',  this.save );
		this.$eventHub.$on('index', this.index );
	},
	beforeDestroy() {
		this.$eventHub.$off('save');
		this.$eventHub.$off('index');
	},

	data(){
		return {
		}
	},

	computed: {
		classTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},

		media(){
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		}
	},

	methods:{
		index(){
			this.$router.push('/class-builders')
		},
		save(){
			this.$store.dispatch('dragrr/saveCurrentTemplate', { source: 'class' })
		},
		remove(){

		}

	}


}
</script>