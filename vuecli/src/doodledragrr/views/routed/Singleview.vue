<template>
	<section class="full-height">
		<od-full-window >
			<template #title     >doodle</template>
			<template #subtitle  >{{ $router.currentRoute.name }}</template>
			<template #cenu      ><router-view name="menu"     /></template>
			<template #content   ><router-view name="content"  /></template>
		</od-full-window>
	</section>
</template>

<script>

export default {
	name: 'singleview',

	mounted() {
		this.$store.dispatch('index/setCredentials', {client: 1, project: 1 })
		this.$store.dispatch('index/getConnections')
	},

}
</script>
