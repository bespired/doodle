
<template>
	<div :id="$options.namedId" class="od-fold-header" :class="{'opened':!folded}" @click="fold()">
		<span class="od-fold-wing"   >
			<od-iconpath name="angle-down" />
		</span>
		<span class="od-fold-label"  >{{ label }}</span>
		<span class="od-fold-actions"></span>
	</div>
</template>

<script>

export default {
	name: 'od-fold-header',
	props: ['label'],

	mounted() {
		this.$store.commit('doodlegui/setFoldState', {
			key:   this.$options.namedId,
			value: true,
		})
	},

    computed: {
        folded() {
            return this.$store.getters['doodlegui/getFoldState'](this.$options.namedId)
        }
    },

	methods: {
		fold(){
			this.$store.commit('doodlegui/setFoldState', {
				key:    this.$options.namedId,
				value: !this.folded,
			})
		}
	}



}
</script>