<template>
	<div class="alertbar fadeInLeft">
		<div class="alert" :class="[style, close]">
			<od-button class="close smaller top-right" @click.stop.self="close='closing'">×</od-button>
			<div class="alert--title">{{ title }}</div>
			<div>{{ message }}</div>
		</div>
	</div>
</template>
<script>
export default {

	name: 'alert-panel',

	props: ['type', 'title', 'message'],

	data() {
		return {
			close: '',
		}
	},

	computed: {
		style() {
			return ('alert--' + this.type)
		}
	},

}
</script>