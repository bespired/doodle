<template>
	<div class="od-window-header">
		<od-button class="double" @click="$eventHub.$emit('index')">Index</od-button>
	</div>
</template>
<script>
export default {
	name: 'index-return',

}
</script>