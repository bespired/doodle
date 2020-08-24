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
	name: 'size-builder',

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