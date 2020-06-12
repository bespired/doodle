<template>
	<section class="full-height">
		<od-split-window sizes="large,smaller" types="index,action">
			<template #title        >Index</template>
			<template #subtitle     >{{ index }}</template>
			<template #leftMenu     ><od-header-search /></template>
			<template #rightMenu    >&nbsp;</template>
			<template #leftContent  >
				<od-thumbs :thumbs="thumbs" :route="route" v-if="thumbs"/>
				<od-loading v-else/>
			</template>
			<template #rightContent >todo... NEW</template>
		</od-split-window>
	</section>
</template>

<script>

export default {
	name: 'index',

	props: ['index'],

	data(){
		return {
			route: document.location.pathname.replace('/admin', '')
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
