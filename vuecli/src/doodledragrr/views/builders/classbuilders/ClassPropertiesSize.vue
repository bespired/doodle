<template>
	<div>

		size ...
	</div>
</template>

<script>
import Vue from 'vue';

export default {
	name: 'class-properties-size',

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
