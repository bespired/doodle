<template>
	<div style="padding: 20px" >
		<template v-for="(font,index) in classTemplate.data" >
			<div :key="`ufo-${index}-${update}`">
				<div>
					{{ index }} / {{ font.fontname }}
				</div>
				<div :class="index">
					<od-markdown :markdown="previewText" />
				</div>
				<hr>
			</div>
		</template>

		<od-text-input vmodel="previewText" label="Preview text" :inset="true"/>

	</div>
</template>

<style>
	.elements{
		padding: 20px;
	}
</style>

<script>
import Vue from 'vue';

export default {
	name: 'class-builder-font',

	beforeMount() {
	},

	destroyed() {
	},

	data(){
		return {
			update     : 0,
			previewText: "The quick brown fox __jumps__ over a _lazy_ dog",
		}
	},

	computed: {
  		classTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},
	},

	watch: {
		classTemplate: {
			deep: true,
			handler(){
				// console.log('class-builder-font : classTemplate ', this.classTemplate)
				this.update++;
			}
		},
	},

	methods: {
	},

}
</script>
<style>
	.examplefont{
		font-size: 2.2vw;
	}
</style>