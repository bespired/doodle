<template>
	<div>
		<od-action @click="create"    label="Create new widget"  icon="plus"      type="action" />
		<od-action @click="upload"    label="Import widget"      icon="publish"   type="second" />
		<od-action @click="edit"      label="Edit selected"      icon="edit"      thumbs="1" />
		<od-action @click="duplicate" label="Duplicate selected" icon="duplicate" thumbs="1" />

		<div class="od-bottom-menu">
			<od-action @click="download" thumbs=">0" label="Export selected" icon="download" type="second" />
			<od-action @click="remove"   thumbs=">0" label="Delete selected" icon="trash"    type="danger"/>
		</div>

		<od-alert index="created"   type="success" title="Created"     message="Your widget template is created." />
		<od-alert index="deleted"   type="success" title="Deleted"     message="Your templates are deleted." />
		<od-alert index="no-delete" type="error"   title="Not Deleted" message="Something went wrong." />

	</div>
</template>
<script>
export default {
	name: 'widget-menu',

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
	},

	methods:{
		create(){
			this.$store.dispatch('dragrr/createTemplate', {
				source: 'widget'
			})
		},
		duplicate(){
			this.$options.confirmModal.open(
				'Sorry', 'Not implemented yet.', 'Hmmm...', {type: 'success'}
			)
		},
		upload(){
			this.$options.confirmModal.open(
				'Sorry', 'Not implemented yet.', 'Hmmm...', {type: 'success'}
			)
		},
		edit(){
			this.$router.push({ path: 'widget-builder/' + this.selectedIndex[0]  })
		},
		download(){
			this.$options.confirmModal.open(
				'Sorry', 'Not implemented yet.', 'Hmmm...', {type: 'success'}
			)
		},
		remove(){
			this.$options.confirmModal.open(
				'Are you sure?',
				'This will delete the selected templates',
				'Delete',
				{type: 'danger'}
			).then((confirm) => {
				if (confirm){
					this.$store.dispatch('dragrr/deleteTemplates', {
						source: 'widget',
						handles: this.selectedIndex
					})
				}
			})
		}
	}

}
</script>