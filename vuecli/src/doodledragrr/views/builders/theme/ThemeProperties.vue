<template>
	<section v-if="themeTemplate">
		<od-text-input vmodel="themeTemplate.label" label="label"/>
		<od-foldable>

			<od-fold-header label="Colors" :key="`header-colors`" />
			<od-fold-body :key="`body-colors`" >
				...
			</od-fold-body>

			<od-fold-header label="Fonts" :key="`header-fonts`" />
			<od-fold-body :key="`body-fonts`" >
				...
			</od-fold-body>
			<od-fold-header label="Sizes" :key="`header-sizes`" />
			<od-fold-body :key="`body-sizes`" >
				...
			</od-fold-body>

		</od-foldable>

	</section>
</template>
<script>

import Vue from 'vue';
export default {
	name: 'widget-properties',

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
		themeTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},

		media(){
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		}
	},

	methods:{
		index(){
			this.$router.push('/theme-builders')
		},
		save(){
			this.$store.dispatch('dragrr/saveCurrentTemplate', { source: 'theme' })
		},
		remove(){

		}

	}


}
</script>