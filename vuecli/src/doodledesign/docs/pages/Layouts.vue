<template>
	<div class="container">
		<div class="title bigger">Layouts</div>
		<div class="title big">Split Window</div>
		<section class="split-window for-overview">
			<od-split-window sizes="small,large" types="legend,detail">
				<template #title        >#title       </template>
				<template #subtitle     >#subtitle    </template>
				<template #leftMenu     >#leftMenu    </template>
				<template #rightMenu    >#rightMenu   </template>
				<template #leftContent  >#leftContent </template>
				<template #rightContent >#rightContent</template>
			</od-split-window>
		</section>
		<od-codeview>
			<pre>
			(*section class="full-height"*)
				(*od-split-window sizes="small,large" types="legend,detail"*)
					(*template #title        *)Doodle Design(*/template*)
					(*template #subtitle     *)({ $router.currentRoute.name })(*/template*)
					(*template #leftMenu     *)(*router-view name="leftMenu"     /*)(*/template*)
					(*template #rightMenu    *)(*router-view name="rightMenu"    /*)(*/template*)
					(*template #leftContent  *)(*router-view name="leftContent"  /*)(*/template*)
					(*template #rightContent *)(*router-view name="rightContent" /*)(*/template*)
				(*/od-split-window*)
			(*/section*)
			</pre>
		</od-codeview>
	</div>

</template>

<script>

export default {
	name: 'tools',
}
</script>
