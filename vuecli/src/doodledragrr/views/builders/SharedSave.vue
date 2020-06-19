<template>
	<div class="od-window-header">
		<od-button class="push-right" @click="$eventHub.$emit('save')"> Save </od-button>
		<od-alert index="saved"     type="success" title="Saved"     message="Your file is saved."   />
		<od-alert index="not-saved" type="error"   title="Not Saved" message="Something went wrong." />
	</div>
</template>
<script>
export default {
	name: 'row-save',
}
</script>