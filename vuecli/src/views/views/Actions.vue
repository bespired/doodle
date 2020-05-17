<template>
	<action-panel :list="list" />
</template>

<script>

export default {
	name: 'actions',

	data(){
		return {
			list: [
				{ panel:'Database Differences',   label:'Differences', route:'differences' },
				{ panel:'Wipe project',           label:'Wipe',        route:'wipe' },
				{ panel:'Clone profile centric',  label:'Clone',       route:'clone-via-profiles' },
				{ panel:'Clone date centric',     label:'Clone',       route:'clone-via-date' }
			]
		}
	}


}
</script>
