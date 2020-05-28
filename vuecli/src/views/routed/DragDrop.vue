<template>
    <section class="full-height">
        <od-split3-window sizes="small,large,small" types="drag,drop,prop">
            <template #title        >Builder</template>
            <template #subtitle     >{{ $router.currentRoute.name }}</template>
            <template #leftMenu      ><router-view name="leftMenu"      /></template>
            <template #centerMenu    ><router-view name="centerMenu"    /></template>
            <template #rightMenu     ><router-view name="rightMenu"     /></template>
            <template #leftContent   ><router-view name="leftContent"   /></template>
            <template #centerContent ><router-view name="centerContent" /></template>
            <template #rightContent  ><router-view name="rightContent"  /></template>
        </od-split3-window>
    </section>
</template>

<script>

export default {
	name: 'actions',
	data(){
		return {
		}
	}
}
</script>
