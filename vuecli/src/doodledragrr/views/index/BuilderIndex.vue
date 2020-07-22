<template>
	<section class="full-height">
		<od-split-window sizes="large,smaller" types="index,action">
			<template #title    >Index</template>
			<template #subtitle >{{ index }}</template>
			<template #leftMenu ><od-header-search /></template>
			<template #leftContent  >
				<od-index :items="thumbs" :route="route" v-if="thumbs"/>
				<od-loading v-else/>
			</template>
			<template #rightContent ><builder-menu /></template>
		</od-split-window>

	</section>
</template>

<script>

import BuilderMenu from '@/doodledragrr/views/index/BuilderMenu.vue'

export default {
	name: 'index',

	props: ['index'],

	components: { BuilderMenu },

	data(){
		const route = document.location.pathname.replace('/admin', '')
		return {
			route: route,
		}
	},

	mounted() {
		const source= this.index.split('-')[0]
		this.$store.dispatch('dragrr/getTemplatedTemplates', { source: source, force: false})
	},

	beforeUpdate() {
		const source= this.index.split('-')[0]
		this.$store.dispatch('dragrr/getTemplatedTemplates', { source: source, force: false})
	},

	computed: {
		thumbs() {
			return this.$store.getters[`dragrr/get${this.index.pascalcase()}`]
		}
	},


}
</script>
