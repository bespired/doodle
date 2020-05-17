<template>
	<div class="action-panels">
		<template v-for="panel in panels">
			<od-action :key="panel.panel" :panel="panel.panel" :label="panel.label" :route="panel.route" />
		</template>
	</div>
</template>
<script>
export default {
	name: 'action-panel',
	props: ['list'],
	computed:{
		panels(){
			return this.list
		}
	}
}
</script>