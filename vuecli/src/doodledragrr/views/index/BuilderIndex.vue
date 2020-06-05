<template>
	<section class="full-height">
		<od-split-window sizes="large,smaller" types="index,action">
			<template #title        >Index</template>
			<template #subtitle     >{{ index }}</template>
			<template #leftMenu     ><od-header-search /></template>
			<template #rightMenu    >&nbsp;</template>
			<template #leftContent  ><od-thumbs :thumbs="thumbs" :route="route" /></template>
			<template #rightContent >todo... NEW</template>
		</od-split-window>
	</section>
</template>

<script>

import Helpers from "@/doodledesign/helpers/helpers.js"

export default {
	name: 'index',

	props: ['index'],

	data(){
		return {
			route: document.location.pathname.replace('/admin', '')
		}
	},

	mounted() {
		let indexer = Helpers.pascalcase(this.index)
		this.$store.dispatch(`dragrr/get${indexer}`)
	},

	computed: {
		thumbs() {
			let indexer = Helpers.pascalcase(this.index)
			return this.$store.getters[`dragrr/get${indexer}`]
		}
	},


}
</script>
