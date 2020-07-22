<template>
	<div class="od-rows">
		<div class="od-thumb-row"
			v-for="(item, index) in rows"
			:key="`row-${item.handle}-${index}-${isSelected(item.handle)}`">
			<router-link :to="{ path: `${path}/${item.handle}` }">
				{{ item.label }}
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'od-index-rows',
	props: ['route', 'rows'],

	data() {
		return {
			path: this.route.replace(/s+$/, ''),
		}
	},

	methods: {
		isSelected(handle) {
			return this.indexSelected.indexOf(handle) > -1
		},
		setSelected(handle) {
			if (!this.isSelected(handle)) this.$store.commit('doodlegui/addIndexSelected', handle)
			else this.$store.commit('doodlegui/removeIndexSelected', handle)
		},
	},

	computed: {
		indexSelected() {
			return this.$store.getters['doodlegui/getIndexSelected']
		},
		keys() {
			let key = ''
			this.indexSelected.forEach((i) => {
				key += i.substr(-6) + '-'
			})
			return key
		},
	},


}
</script>