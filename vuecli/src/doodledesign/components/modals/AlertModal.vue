<template>
	<div id="alertModal" class="modal" >
		<alert-panel v-for="(panel,idx) in panels"
			:style   = "top(idx)"
			:key     = "panel.id"
			:type    = "panel.type"
			:title   = "panel.title"
			:message = "panel.message"
		/>
	</div>

</template>
<script>

// modal renders all instances of alert panels
// if any panels are on check every second what to remove

export default {

	name: 'alert-modal',

	data(){
		return {
			watching: null,
		}
	},

	mounted() {
		this.watching= setTimeout(this.checkForRemove, 250)
	},

	computed:{
		panels(){
			return this.$store.getters['doodlegui/getAlertPanels']
		}
	},

	watch:{
		panels(alerts){
			if (( this.watching === null ) && ( alerts.length > 0 ))
				this.watching= setTimeout(this.checkForRemove, 5000)
		}
	},

	methods:{
		top(idx){
			return `transition: top 250ms; top: ${(idx-1)*80-20}px`;
		},
		checkForRemove(){
			let now = new Date().getTime()
			let del = []
			// loop panels... what age do they have? old? remove...
			this.panels.forEach((alert)=>{
				if ( alert.created_at === undefined ) alert.created_at = now
				if ( alert.created_at <= now - 4750 ) {
					del.push(alert.id)
				}
			})
			if ( del.length > 0 ){
				del.forEach((id)=>{
					this.$store.commit('doodlegui/removeAlertPanel', id)
				})
			}
			if (this.panels.length > 0) {
				this.watching= setTimeout(this.checkForRemove, 250)
			}else{
				this.watching= null
			}
		}
	}

}
</script>