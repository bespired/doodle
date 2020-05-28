<template>
	<div v-if="thumbs && Object.keys(thumbs)" class="od-thumbs">
		<template v-for="(item, index) in thumbs">
			<router-link class="od-thumb"
				:key="`${item.name}-${index}`"
				:to= "{ path: `${path}/${item.handle}` }"
			>
				<span class="bottom">
					{{ item.label }}
				</span>

			</router-link>
		</template>
	</div>
</template>

<script>

export default {
	name: 'od-thumbs',
	props: ['route', 'thumbs'],

	data(){
        return {
        	path: this.route.replace(/s+$/,''),
        }
    },

}
</script>