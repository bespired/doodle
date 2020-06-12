<template>
	<section v-if="layoutTemplate">
		<!-- <od-title type="big" :key="layoutTemplate.label">{{ layoutTemplate.label }}</od-title> -->

		<od-text-input vmodel="layoutTemplate.label" label="label"/>

		<od-select vmodel="layoutTemplate.responsive" label="responsive" :options="responsiveOptions" />

		<od-select smodel="row:devicesize" label="media" :options="mediaOptions"  />

		<od-foldable >
			<od-fold-header label="Gutter sizes" />
			<od-fold-body>
				<od-slider label="Row"    vmodel="layoutTemplate.media.$media.gutters.row"    :min="0" :max="200" units="px" />
				<od-slider label="column" vmodel="layoutTemplate.media.$media.gutters.column" :min="0" :max="200" units="px" />
				<od-slider label="Top"    vmodel="layoutTemplate.media.$media.gutters.top"    :min="0" :max="200" units="px" />
				<od-slider label="Bottom" vmodel="layoutTemplate.media.$media.gutters.bottom" :min="0" :max="200" units="px" />
			</od-fold-body>
			<od-fold-header label="Row layout" />
			<od-fold-body>
				<od-select label="fillstyle"   vmodel="layoutTemplate.media.$media.fillstyle"  :options="fillstyleOptions" />
				<od-slider label="Max width"   vmodel="layoutTemplate.media.$media.maxWidth"   :min="100" :max="2000" units="px"
						   v-if="layoutTemplate.media[media].fillstyle === 'max-width'" />
				<od-select label="background"  vmodel="layoutTemplate.media.$media.background" :options="backgroundOptions" />
			</od-fold-body>
			<od-fold-header label="Media breakpoints" />
			<od-fold-body>
				<od-slider label="Media minimum" vmodel="layoutTemplate.media.$media.min" :min="0" :max="2000" units="px" />
				<od-slider label="Media maximum" vmodel="layoutTemplate.media.$media.max" :min="0" :max="2000" units="px" />
			</od-fold-body>
		</od-foldable>

		<!-- {{ layoutTemplate.media[media] }} -->

	</section>
</template>
<script>

import Vue from 'vue';
export default {
	name: 'layout-properties',

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
			responsiveOptions: [0,6,8,10,12],
			backgroundOptions: ['image', 'movie', 'color'],
			fillstyleOptions: ['full-width', 'max-width'],
			mediaOptions: ['mobile', 'tablet', 'desktop', 'xlarge']
		}
	},

	computed: {
		layoutTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},

		media(){
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		}
	},

	methods:{
		index(){
			this.$router.push('/layout-builders')
		},
		save(){
			this.$store.dispatch('dragrr/saveCurrentTemplate',  {source: 'layout'})
		},

	}


}
</script>