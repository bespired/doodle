<template>
	<div>
		color ...
	</div>
</template>

<script>
import Vue from 'vue';

export default {
	name: 'color-properties',

	beforeMount() {
	},

	destroyed() {
	},

	data(){
		return {

		}
	},

	computed: {
  		classTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},
	},

	methods: {

	},

}
</script>
