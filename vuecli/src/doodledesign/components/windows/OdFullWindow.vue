<template>
	<div class="inner-panel">
		<div class="top-title ucfirst">
			<slot name="title">&nbsp;</slot>
		</div>
		<div class="sub-title ucfirst">
			<slot name="subtitle"></slot>
		</div>
		<div class="inner-window-flex">
			<div class="full-width">
				<div class="od-window-header">
					<slot name="menu"><!-- menu--></slot>
				</div>
				<div class="od-window-content padding">
					<slot name="content">content missing</slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'od-full-window',
	props: ['type'],
	data() {
		return {
			localClass: 'inner-panel',
		}
	}
}
</script>