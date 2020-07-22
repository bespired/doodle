<template>
	<section class="dd-size-look themes" v-if="themeTemplate">
		<code>
			...
		</code>
	</section>
</template>

<style>
	.elements{
		padding: 20px;
	}
</style>

<script>
import Vue from 'vue';
export default {
	name: 'theme-builder',

	beforeMount() {
	},
	destroyed() {
	},

	data(){
		return {
		}
	},

	computed: {
  		themeTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},
	},

	methods: {
	},



}
</script>