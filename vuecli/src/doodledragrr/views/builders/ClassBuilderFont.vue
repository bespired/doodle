<template>
	<div style="padding: 20px">

		<div>
			Title font / {{ titlefont }}
		</div>
		<div class="titlefont">
			<od-markdown :markdown="previewText" />
		</div>
		<hr>
		<div>
			Article font / {{ articlefont }}
		</div>
		<div class="articlefont">
			<od-markdown :markdown="previewText" />
		</div>
		<hr>
		<div>
			Special font / {{ specialfont }}
		</div>
		<div class="specialfont">
			<od-markdown :markdown="previewText" />
		</div>
		<hr>
		<div>
			Code font / {{ codefont }}
		</div>
		<div class="codefont">
			<od-markdown :markdown="previewText" />
		</div>
		<hr>
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
		this.addFonts()
	},

	destroyed() {
	},

	data(){
		return {
			previewText: "The quick brown fox __jumps__ over the _lazy_ dog",

			titlefont:   'Roboto',
			articlefont: 'Open Sans',
			specialfont: 'Playfair Display',
			codefont:    'Source Code Pro',
		}
	},

	computed: {
  		classTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},
	},

	methods: {

		addFonts(){
			let url    = 'https://fonts.googleapis.com/css2'
			let styles = 'ital,wght@0,400;0,700;1,400;1,700'

			let families = {}
			families[this.titlefont]   = this.titlefont
			families[this.articlefont] = this.articlefont
			families[this.specialfont] = this.specialfont
			families[this.codefont]    = this.codefont

			let keys= Object.keys(families)
			let family = ''
			keys.forEach( key =>{
				family += `family=${encodeURIComponent(key)}:${styles}&`
			})

			let fetch  = ''
			fetch +=`<link id="link-fnt1" rel="stylesheet" href="${url}?${family}display=swap">`

			fetch +=`<style id="style-fnt1">`
			fetch +=`  .titlefont{   font-family: '${this.titlefont}', sans-serif; }`
			fetch +=`  .articlefont{ font-family: '${this.articlefont}', sans-serif; }`
			fetch +=`  .specialfont{ font-family: '${this.specialfont}', serif; }`
			fetch +=`  .codefont{    font-family: '${this.codefont}', monospace; }`
			fetch +=`</style>`

			let temp = document.createElement('div');
			temp.innerHTML = fetch

			let head = document.head;

			while (temp.firstChild) {
    			head.appendChild(temp.firstChild);
			}

		}

	},

}
</script>
<style>
	.examplefont{
		font-size: 2.2vw;
	}
</style>