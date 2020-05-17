<template>
	<section class="full-height">
		<od-split-window sizes="small,large" types="legend,detail">
			<template #title        >Doodle Design</template>
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

	mounted(){
	}

}
</script>
