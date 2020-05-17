<template>
	<div>
		{{ messages }}
		<od-status-list :list="connections" show="config.name" label="config.label" status="status" />
	</div>
</template>

<script>

export default {
	name: 'connections',

	computed: {
		connections() {
			return this.$store.getters['index/connections']
		},
		messages() {
			return this.$store.getters['pusher/messages']
		},
	},

}
</script>
