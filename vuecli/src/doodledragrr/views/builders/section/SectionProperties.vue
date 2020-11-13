<template>
	<section v-if="sectionTemplate">
		<od-text-input vmodel="sectionTemplate.label" label="label"/>

		<!-- <od-select vmodel="sectionTemplate.layout" label="layout" :options="layoutOptions" /> -->

		<od-foldable>
			<template v-for="(row, idx) in sectionTemplate.rows">

				<od-fold-header label="Row" :key="`header-${idx}`" />
				<od-fold-body :key="`body-${idx}`" >

				<template v-for="(space, inx) in row.spaces">
					<div :key="`row-${idx}-column-${inx}`">

						<div>{{ space.widget }}</div>
						<div>{{ space.content }}</div>
						<div>{{ space.widths }}</div>

					</div>
				</template>

				</od-fold-body>
			</template>

		</od-foldable>

		<!-- {{ sectionTemplate }} -->
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
			layoutOptions: ['full-width', '12-layout'],
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
			this.$store.dispatch('dragrr/saveCurrentTemplate', { source: 'section' })
		},

	}


}
</script>