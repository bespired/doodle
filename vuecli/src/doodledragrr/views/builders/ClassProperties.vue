<template>
	<section v-if="classTemplate">
		<od-text-input vmodel="classTemplate.label" label="label"/>

		... class related properties ...

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