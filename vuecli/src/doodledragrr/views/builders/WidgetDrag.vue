<template>
	<section v-if="widgetTemplate">
		stuff to drag...

	</section>
</template>
<script>

import Vue from 'vue';
export default {
	name: 'widget-properties',

	created() {
	},
	beforeDestroy() {
	},

	data(){
		return {
		}
	},


	computed: {
		widgetTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},
	},

	methods:{
	}


}
</script>