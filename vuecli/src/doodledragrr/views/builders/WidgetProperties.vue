<template>
	<section v-if="widgetTemplate">
		<od-text-input vmodel="widgetTemplate.label" label="label"/>


	</section>
</template>
<script>

import Vue from 'vue';
export default {
	name: 'widget-properties',

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
			layoutOptions: ['full-width', '12-layout'],
		}
	},


	computed: {
		widgetTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},

		media(){
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		}
	},

	methods:{
		index(){
			this.$router.push('/widget-builders')
		},
		save(){
			this.$store.dispatch('dragrr/saveCurrentTemplate', { source: 'widget' })
		},

	}


}
</script>