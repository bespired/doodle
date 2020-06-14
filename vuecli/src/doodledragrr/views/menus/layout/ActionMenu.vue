<template>
	<div>
		<od-action label="Create new layout" icon="plus" type="action" />
		<od-action label="Import layout"     icon="publish" type="second" />
		<od-action label="Edit selected"     icon="edit"
			v-if="selectedThumbsAmount === 1" />

		<div class="od-bottom-menu" v-if="selectedThumbsAmount > 0" >
			<od-action label="Export selected" icon="download" type="second" />
			<od-action label="Delete selected" icon="trash" type="danger"/>
		</div>

	</div>
</template>
<script>
export default {
	name: 'action-menu',

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

}
</script>