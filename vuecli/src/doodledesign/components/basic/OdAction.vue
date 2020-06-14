<template>
	<div class="od-action-row">
		<od-button
			@click="$emit('click')"
			:class="type" class="left-icon" :icons="`${icon},${icon}`">
			{{ label }}
		</od-button>
	</div>
</template>
<script>
export default {
	name: 'od-action',
	props: {
		type : String,
		panel: String,
		label: String,
		icon : String,
	},
};
</script>