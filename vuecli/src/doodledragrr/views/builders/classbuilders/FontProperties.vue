<template>
	<div>

	</div>
</template>
<style>
	.flex-1 { flex: 1 }
	.flex-2 { flex: 2 }
</style>
<script>
import Vue from 'vue';

export default {
	name: 'font-properties',

	beforeMount() {
		this.$store.dispatch('dragrr/getSettings', { source: 'googleFonts', force: false })
	},

	destroyed() {},

	data() {
		return {
		}
	},

	computed: {
		classTemplate() {
			return this.$store.getters['dragrr/currentTemplate']
		},
		googleFont() {
			return this.$store.getters['dragrr/getSetting']('googleFonts')
		},
	},



	methods: {
	},

}
</script>