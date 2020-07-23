<template>
	<div style="padding: 20px">

		<template v-for="(font,index) in classTemplate.data" >
			<div :key="index">
				<div>
					{{ index }} / {{ font.fontname }}
				</div>
				<div :class="index">
					<od-markdown :markdown="previewText" />
				</div>
				<hr>
			</div>
		</template>
		<!--
		<div>
			Article font / {{ classTemplate.data.articlefont.fontname }}
		</div>
		<div class="articlefont">
			<od-markdown :markdown="previewText" />
		</div>
		<hr>
		<div>
			Special font / {{ classTemplate.data.specialfont.fontname }}
		</div>
		<div class="specialfont">
			<od-markdown :markdown="previewText" />
		</div>
		<hr>
		<div>
			Code font / {{ classTemplate.data.codefont.fontname }}
		</div>
		<div class="codefont">
			<od-markdown :markdown="previewText" />
		</div>
		<hr> -->
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
			previewText: "The quick brown fox __jumps__ over the _lazy_ dog",
		}
	},

	computed: {
  		classTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
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