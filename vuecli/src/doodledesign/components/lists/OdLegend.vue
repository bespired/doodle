<template>
	<div v-if="Object.keys(legend)">
		<template v-for="(item, index) in legend">
			<router-link class="button simple"
				:key="`${item.name}-${index}`"
				:to= "{ name: item.name }" >{{ item.label }}
			</router-link>
		</template>
	</div>
</template>

<script>

export default {
	name: 'od-legend',
	props: ['legend'],
}
</script>