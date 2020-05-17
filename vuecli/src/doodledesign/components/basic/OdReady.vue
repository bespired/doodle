<template>
	<div class="padding-30">
		<od-loading  v-if="!ready" />
		<slot v-else />
	</div>
</template>

<script>

export default {
	name: 'od-ready',
	props: ['ready']
}
</script>