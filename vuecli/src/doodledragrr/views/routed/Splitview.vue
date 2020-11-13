<template>
	<section class="full-height">
		<od-split-window sizes="half, half" types="edit, props">
			<template #title        >doodle</template>
			<template #subtitle     >{{ $router.currentRoute.meta.title }}</template>
			<template #leftMenu     ><router-view name="leftMenu"     /></template>
			<template #rightMenu    ><router-view name="rightMenu"    /></template>
			<template #leftContent  ><router-view name="leftContent"  /></template>
			<template #rightContent ><router-view name="rightContent" /></template>
		</od-split-window>
	</section>
</template>

<script>


export default {
	name: 'splitview',

	props: ['source'], // router hands the source... like layout...

	mounted(){
		let handle= this.$router.currentRoute.params.id
		this.$store.dispatch(`dragrr/setCurrentTemplate`, {
			source: this.source,
			handle: handle
		})

		let media = this.$store.getters['doodlegui/getRadioState']('devicesize')
		if (!media) {
			this.$store.commit('doodlegui/setRadioState', {
				key: 'devicesize', value: 'desktop',
			})
		}
	},

	beforeUpdate() {
		let handle= this.$router.currentRoute.params.id
		this.$store.dispatch(`dragrr/setCurrentTemplate`, {
			source: this.source,
			handle: handle
		})
	},

	beforeDestroy() {
		this.$store.commit(`dragrr/clearCurrentTemplate`)
	},



}
</script>
