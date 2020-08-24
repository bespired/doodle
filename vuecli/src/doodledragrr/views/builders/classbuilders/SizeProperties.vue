<template>
	<div>

		size ...
	</div>
</template>

<script>
import Vue from 'vue';

export default {
	name: 'size-properties',

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
