<template>
	<section class="full-height">
		<od-split-window sizes="large,small" types="result,action">
			<template #title        >doodle</template>
			<template #subtitle     >{{ $router.currentRoute.name }}</template>
			<template #leftMenu     ><router-view name="leftMenu"     /></template>
			<template #rightMenu    ><router-view name="rightMenu"    /></template>
			<template #leftContent  ><router-view name="leftContent"  /></template>
			<template #rightContent ><router-view name="rightContent" /></template>
		</od-split-window>
	</section>
</template>

<script>

export default {
	name: 'overview',

	mounted() {
		this.$store.dispatch('index/setCredentials', {client: 1, project: 1 })
		this.$store.dispatch('index/getConnections')
	},

}
</script>
