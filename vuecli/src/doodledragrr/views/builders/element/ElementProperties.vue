<template>
	<section v-if="elementTemplate">
	</section>
</template>
<script>

import Vue from 'vue';
export default {
	name: 'element-properties',

	created() {
		this.$eventHub.$on('save',  this.save );
		this.$eventHub.$on('index', this.index );
	},
	beforeDestroy() {
		this.$eventHub.$off('save');
		this.$eventHub.$off('index');
	},

	data(){
		return {
		}
	},

	computed: {
		elementTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},
	},

	methods:{
		index(){
			this.$router.push('/element-builders')
		},
		save(){
			this.$store.dispatch('dragrr/saveCurrentTemplate', { source: 'element' })
		},
	}


}
</script>