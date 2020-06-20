<template>
	<div v-if="thumbs && Object.keys(thumbs)" class="od-thumbs" >
		<template v-for="(item, index) in thumbs">
			<div class="od-thumb" :class="[{selected:isSelected[item.handle]}, item.status]"
				@click="setSelected(item)"
				:key="`${item.name}-${index}-${update}`">
				<div class="od-thumb-canvas">
					<span class="icon" v-if="item.icon">
						<od-iconpath :name="item.icon" />
					</span>
					<span class="draw" v-if="item.draw">
						{{ draw }}
					</span>
					<router-link
						:to= "{ path: `${path}/${item.handle}` }"
					>
						<span class="thumb-title">
							{{ item.label }}
						</span>
					</router-link>
				</div>
			</div>
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
        	update: 0,
        	isSelected: {}
        }
    },

    methods:{
		setSelected(item){
			this.update++
			if ( this.isSelected[item.handle] === undefined ) {
				this.$store.commit('doodlegui/addIndexSelected', item.handle)
				this.isSelected[item.handle] = true;
				return;
			}
			this.isSelected[item.handle] = !this.isSelected[item.handle]

			if ( this.isSelected[item.handle] ) this.$store.commit('doodlegui/addIndexSelected', item.handle)
			else this.$store.commit('doodlegui/removeIndexSelected', item.handle)
		},
	}

}
</script>