<template>
	<div :data-type="type" :data-title="title" :data-message="message"></div>
</template>
<script>
export default {

	name: 'od-alert',

	props: ['index', 'type', 'title', 'message'],

	mounted() {
		this.$store.commit('doodlegui/prepareAlertPanel', {
			index   : this.index,
			type    : this.type,
			title   : this.title,
			message : this.message,
		})
	},


}
</script>