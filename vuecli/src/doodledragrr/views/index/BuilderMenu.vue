<template>
	<div>
		<od-action @click="create" :label="`Create new ${source}`"  icon="plus" type="action" />
		<od-action @click="upload"   :label="`Import ${source}`"    icon="publish"   type="second" />
		<!-- <od-upload
				:label     = "`Drop a ${source} file in this box`"
				cancel     = "journeys"
				uploadUrl  = "uploadUrl"
				@uploaded  = "done"
			/> -->

		<od-action @click="edit" label="Edit selected" icon="edit" thumbs="1"  />


		<div class="od-bottom-menu">
			<od-action @click="duplicate" thumbs=">0" label="Duplicate selected"  icon="duplicate"  />
			<od-action @click="download"  thumbs=">0" label="Export selected"     icon="download" type="second" />
			<od-action @click="remove"    thumbs=">0" label="Delete selected"     icon="trash"    type="danger"/>
		</div>

		<od-alert index="duplicated" type="success" title="Duplicated" :message="`Your ${source} template is duplicated.`" />
		<od-alert index="created"    type="success" title="Created"    :message="`Your ${source} template is created.`" />
		<od-alert index="deleted"    type="success" title="Deleted"     message="Your templates are deleted." />
		<od-alert index="error"      type="error"   title="Error"       message="Something went wrong." />

	</div>
</template>
<script>
export default {
	name: 'builder-menu',

	props: ['items', 'index'],

	mounted() {
		this.$store.commit('doodlegui/clearIndexSelected')
	},
	beforeDestroy() {
		this.$store.commit('doodlegui/clearIndexSelected')
	},

	data(){
		const route = document.location.pathname.replace('/admin', '')
		return {
			source: this.index.replace('-templates', ''),
		}
	},

	computed: {
		selectedIndex(){
			return this.$store.getters['doodlegui/getSelectedIndex']
		},
	},

	methods:{
		done(){

		},
		create(){
			this.$store.dispatch('dragrr/createTemplate', {
				source: this.source,
			})
		},
		duplicate(){
			this.$store.dispatch('dragrr/duplicateTemplates', {
				source:  this.source,
				handles: this.selectedIndex
			})
		},
		upload(){
			this.$options.confirmModal.open(
				'Sorry', 'Not implemented yet.', 'Hmmm...', {type: 'success'}
			)
		},
		edit(){
			const path = this.source + '-builder/' + this.selectedIndex[0]
			this.$router.push({ path: path })
		},
		download(){
			this.$store.dispatch('dragrr/exportTemplates', {
				source:  this.source,
				handles: this.selectedIndex
			})
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
						source:  this.source,
						handles: this.selectedIndex
					})
				}
			})
		}
	}

}
</script>