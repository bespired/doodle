<template>
	<section class="dd-size-look elements" v-if="elementTemplate">
		<code>
			<pre contenteditable="true">{{ elementTemplate.otml }}</pre>
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
	name: 'element-builder',

	beforeMount() {
	},
	destroyed() {
	},

	data(){
		return {
		}
	},

	computed: {
  		elementTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},
	},

	methods: {
	},



}
</script>