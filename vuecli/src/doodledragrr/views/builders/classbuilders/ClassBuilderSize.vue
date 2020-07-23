<template>
	<div>size</div>
</template>

<style>
	.elements{
		padding: 20px;
	}
</style>

<script>
import Vue from 'vue';
export default {
	name: 'class-builder-size',

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