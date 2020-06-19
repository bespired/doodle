<template>
	<section v-if="sectionTemplate">
		<!-- <od-title type="big" :key="sectionTemplate.label">{{ sectionTemplate.label }}</od-title> -->

		<od-text-input vmodel="sectionTemplate.label" label="label"/>

		<od-select vmodel="sectionTemplate.responsive" label="responsive" :options="responsiveOptions" />

		<od-select smodel="row:devicesize" label="media" :options="mediaOptions"  />

		<od-foldable >
			<od-fold-header label="Gutter sizes" />
			<od-fold-body>
				<od-slider label="Row"    vmodel="sectionTemplate.media.$media.gutters.row"    :min="0" :max="200" units="px" />
				<od-slider label="column" vmodel="sectionTemplate.media.$media.gutters.column" :min="0" :max="200" units="px" />
				<od-slider label="Top"    vmodel="sectionTemplate.media.$media.gutters.top"    :min="0" :max="200" units="px" />
				<od-slider label="Bottom" vmodel="sectionTemplate.media.$media.gutters.bottom" :min="0" :max="200" units="px" />
			</od-fold-body>
			<od-fold-header label="Row section" />
			<od-fold-body>
				<od-select label="fillstyle"   vmodel="sectionTemplate.media.$media.fillstyle"  :options="fillstyleOptions" />
				<od-slider label="Max width"   vmodel="sectionTemplate.media.$media.maxWidth"   :min="100" :max="2000" units="px"

						   v-if="sectionTemplate.media[media].fillstyle === 'max-width'" />
				<od-select label="background"  vmodel="sectionTemplate.media.$media.background" :options="backgroundOptions" />
			</od-fold-body>
			<od-fold-header label="Media breakpoints" />
			<od-fold-body>
				<od-slider label="Media minimum" vmodel="sectionTemplate.media.$media.min" :min="0" :max="2000" units="px" />
				<od-slider label="Media maximum" vmodel="sectionTemplate.media.$media.max" :min="0" :max="2000" units="px" />
			</od-fold-body>
		</od-foldable>

		<!-- {{ sectionTemplate.media[media] }} -->

	</section>
</template>
<script>

import Vue from 'vue';
export default {
	name: 'section-properties',

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
		sectionTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},

		media(){
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		}
	},

	methods:{
		index(){
			this.$router.push('/section-builders')
		},
		save(){
			console.log('save')
			this.$store.dispatch('dragrr/saveCurrentTemplate',  {source: 'section'})
		},

	}


}
</script>