<template>
	<div class="action-panel">
		<div>{{ panel }}</div>
		<div class="bottom-glue">
			<od-link :route="route"> {{ label }}  </od-link>
		</div>
	</div>
</template>
<script>
export default {
	name: 'od-action',
	props: {
		type : String,
		panel: String,
		label: String,
		route: String
	},
};
</script>