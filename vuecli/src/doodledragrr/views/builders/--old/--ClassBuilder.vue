<template>
	<section class="dd-size-look classes" v-if="classTemplate">
		<component :is="`class-builder-${classTemplate.area}`" />
	</section>
</template>

<style>
	.elements{
		padding: 20px;
	}
</style>

<script>
// import ClassBuilderColor from './classbuilders/ClassBuilderColor.vue'
// import ClassBuilderFont  from './classbuilders/ClassBuilderFont.vue'
// import ClassBuilderSize  from './classbuilders/ClassBuilderSize.vue'

export default {
	name: 'class-builder',

	components: {
		ClassBuilderColor, ClassBuilderFont, ClassBuilderSize
	},

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