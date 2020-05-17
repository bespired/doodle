<template>
	<div class="od-fold-body">
		<slot />
	</div>
</template>

<script>

export default {
	name: 'od-fold-body',
	props: ['label'],
}
</script>