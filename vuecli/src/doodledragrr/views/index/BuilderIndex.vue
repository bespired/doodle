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

import WidgetActionMenu  from '@/doodledragrr/views/index/WidgetMenu.vue'
import LayoutActionMenu  from '@/doodledragrr/views/index/LayoutMenu.vue'
import SectionActionMenu from '@/doodledragrr/views/index/SectionMenu.vue'

export default {
	name: 'index',

	props: ['index'],

	components: { LayoutActionMenu, SectionActionMenu, WidgetActionMenu },

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
