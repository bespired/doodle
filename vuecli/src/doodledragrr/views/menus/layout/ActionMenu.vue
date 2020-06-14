<template>
	<div :key="`selected-${selectedIndex}`">
		<od-action @click="create" label="Create new layout" icon="plus" type="action" />
		<od-action @click="upload" label="Import layout"     icon="publish" type="second" />
		<od-action @click="edit"   label="Edit selected"     icon="edit"
			v-if="selectedThumbsAmount === 1" />

		<div class="od-bottom-menu" v-if="selectedThumbsAmount > 0" >
			<od-action @click="download" label="Export selected" icon="download" type="second" />
			<od-action @click="remove"   label="Delete selected" icon="trash" type="danger"/>
		</div>

	</div>
</template>
<script>
export default {
	name: 'action-menu',

	mounted() {
		this.$store.commit('doodlegui/clearIndexSelected')
	},
	beforeDestroy() {
		this.$store.commit('doodlegui/clearIndexSelected')
	},

	computed: {
		selectedIndex(){
			return this.$store.getters['doodlegui/getSelectedIndex']
		},
		selectedThumbsAmount(){
			let selected= this.selectedIndex
			if ( selected === undefined ) return 0
			return selected.length
		},
	},

	methods:{
		create(){
		},
		upload(){
		},
		edit(){
			this.$router.push({ path: 'layout-builder/' + this.selectedIndex[0]  })
		},
		download(){
		},
		remove(){
		},
	}

}
</script>