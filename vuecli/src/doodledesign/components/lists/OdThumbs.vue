<template>
	<div v-if="thumbs && Object.keys(thumbs)" class="od-thumbs" :key="keys">
		<template v-for="(item, index) in thumbs">
			<div class="od-thumb" :class="[{selected:isSelected(item.handle)}, item.status]"
				@click="setSelected(item.handle)"
				:key="`${item.handle}-${index}-${isSelected(item.handle)}`">
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
        }
    },

    methods:{
    	isSelected(handle){
    		return this.indexSelected.indexOf(handle) > -1
    	},
		setSelected(handle){
			if ( !this.isSelected(handle) ) this.$store.commit('doodlegui/addIndexSelected', handle)
			else this.$store.commit('doodlegui/removeIndexSelected', handle)
		},
	},

    computed: {
        indexSelected() {
            return this.$store.getters['doodlegui/getIndexSelected']
        },
        keys(){
    		let key= ''
    		this.indexSelected.forEach((i)=>{
    			key += i.substr(-6) + '-'
    		})
    		return key
    	},
    },


}
</script>