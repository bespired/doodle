<template>
	<section class="full-height">
		<od-split-window sizes="large,smaller" types="index,action">
			<template #title    >Index</template>
			<template #subtitle >{{ index }}</template>
			<template #leftMenu ><od-header-search /></template>
			<template #leftContent  >
				<od-thumbs :thumbs="thumbs" :route="route" v-if="thumbs"/>
				<od-loading v-else/>
			</template>
			<template #rightContent >
				<component :is="component" />
			</template>
		</od-split-window>

	</section>
</template>

<script>

import LayoutActionMenu  from '@/doodledragrr/views/menus/layout/ActionMenu.vue'
import SectionActionMenu from '@/doodledragrr/views/menus/section/ActionMenu.vue'

export default {
	name: 'index',

	props: ['index'],

	components: { LayoutActionMenu, SectionActionMenu },

	data(){
		const route = document.location.pathname.replace('/admin', '')
		return {
			route:     route,
			component: route.replace('/', '').replace('-builders', '') + '-action-menu',
		}
	},

	mounted() {
		this.$store.dispatch(`dragrr/get${this.index.pascalcase()}`, {force: false})
	},

	beforeUpdate() {
		this.$store.dispatch(`dragrr/get${this.index.pascalcase()}`, {force: true})
	},

	computed: {
		thumbs() {
			return this.$store.getters[`dragrr/get${this.index.pascalcase()}`]
		}
	},


}
</script>
