<template>
	<div>
		<od-foldable>
			<od-fold-header label="Title font" />
			<od-fold-body>
				<od-radiorow>
					<od-radiobox vmodel="titlefont.fontsource" value="googlefont" class="smaller">Google font </od-radiobox>
					<od-radiobox vmodel="titlefont.fontsource" value="localfont" class="smaller">Local font </od-radiobox>
				</od-radiorow>
			</od-fold-body>
			<od-fold-header label="Article font" />
			<od-fold-body>
				<od-radiorow>
					<od-radiobox vmodel="articlefont.fontsource" value="googlefont" class="smaller">Google font </od-radiobox>
					<od-radiobox vmodel="articlefont.fontsource" value="localfont" class="smaller">Local font </od-radiobox>
				</od-radiorow>
			</od-fold-body>
			<od-fold-header label="Special font" />
			<od-fold-body>
				<od-radiorow>
					<od-radiobox vmodel="specialfont.fontsource" value="googlefont" class="smaller">Google font </od-radiobox>
					<od-radiobox vmodel="specialfont.fontsource" value="localfont" class="smaller">Local font </od-radiobox>
				</od-radiorow>
			</od-fold-body>
			<od-fold-header label="Code font" />
			<od-fold-body>
				<od-radiorow>
					<od-radiobox vmodel="codefont.fontsource" value="googlefont" class="smaller">Google font </od-radiobox>
					<od-radiobox vmodel="codefont.fontsource" value="localfont" class="smaller">Local font </od-radiobox>
				</od-radiorow>
			</od-fold-body>
		</od-foldable>
	</div>
</template>
<script>
import Vue from 'vue';

export default {
	name: 'class-properties-font',

	beforeMount() {
		if (this.classTemplate.data === null) {
			this.classTemplate.data = {
				titlefont: {
					fontsource: 'googlefont',
					fontname: 'Roboto',
					fontfamily: 'Roboto',
					fontweight: 400,
					boldweight: 600,
  					fontstyles: 'normal,italic',
					system: 'sans-serif'
				},
				articlefont: {
					fontsource: 'googlefont',
					fontname: 'Open Sans',
					fontfamily: 'Open Sans',
					fontweight: 400,
					boldweight: 600,
					fontstyles: 'normal,italic',
					system: 'sans-serif'
				},
				specialfont: {
					fontsource: 'googlefont',
					fontname: 'Playfair Display',
					fontfamily: 'Playfair Display',
					fontweight: 400,
					boldweight: 600,
					fontstyles: 'normal,italic',
					system: 'serif'
				},
				codefont: {
					fontsource: 'googlefont',
					fontname: 'Source Code Pro',
					fontfamily: 'Source Code Pro',
					fontweight: 400,
					boldweight: 400,
					fontstyles: 'normal,italic',
					system: 'monospace'
				}
			}
		}

		this.addFonts()
	},

	destroyed() {},

	data() {
		return {}
	},

	computed: {
		classTemplate() {
			return this.$store.getters['dragrr/currentTemplate']
		},
	},

	methods: {
		addFonts() {
			let url = 'https://fonts.googleapis.com/css2'
			let styles = 'ital,wght@0,400;0,700;1,400;1,700'

			let families = {}

			let fontkeys = Object.keys(this.classTemplate.data)

			fontkeys.forEach(key => {
				let fontfam = this.classTemplate.data[key]
				if (families[fontfam.fontfamily] === undefined) {
					families[fontfam.fontfamily] = {}
				}
				families[fontfam.fontfamily][fontfam.fontweight] = fontfam.fontweight
				families[fontfam.fontfamily][fontfam.boldweight] = fontfam.boldweight
			})

			let names = Object.keys(families)
			let family = ''
			names.forEach(name => {
				// style should look into all with same family...
				let weights = {}
				let iWeights = {}
				let nWeights = {}
				fontkeys.forEach(key => {
					let fontfam = this.classTemplate.data[key]
					if( name === fontfam.fontfamily){
						weights[fontfam.fontweight] = fontfam.fontweight
						weights[fontfam.boldweight] = fontfam.boldweight
						if ( fontfam.fontstyles.indexOf('italic') !== -1 ) {
							iWeights[fontfam.fontweight] = fontfam.fontweight
							iWeights[fontfam.boldweight] = fontfam.boldweight
						}
						if ( fontfam.fontstyles.indexOf('normal') !== -1 ) {
							nWeights[fontfam.fontweight] = fontfam.fontweight
							nWeights[fontfam.boldweight] = fontfam.boldweight
						}
					}
				})

				// let styles = 'ital,wght@0,400;0,700;1,400;1,700'
				let styles = ''

				if ( Object.keys(iWeights).length === 0){
					// no italic:   wght@100;300
					styles= 'wght@'
					Object.keys(weights).forEach(w => { styles+= `${w};` })
					styles= styles.slice(0, -1);

				}else{
					// with italic: ital,wght@0,100;0,300;1,100 ( 1= italic )
					styles= 'ital,wght@'
					Object.keys(nWeights).forEach(w => { styles+= `0,${w};` })
					Object.keys(iWeights).forEach(w => { styles+= `1,${w};` })
					styles= styles.slice(0, -1);
				}

				family += `family=${encodeURIComponent(name)}:${styles}&`
			})

			// dont load all cyrilic, greek, vietnameze glyphs
			let text = '®©$€£¥0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
			let st= [32,58,91,123], ed= [47,64,96,126]
			for (let i = 0; i < 4; i++ ){ for (let c = st[i]; c <= ed[i]; c++) { text += `%${c}` } }

			let fetch = ''
			fetch += `<link id="link-fnt1" rel="stylesheet" href="${url}?${family}display=swap&text=${text}">`

			fetch += `<style id="style-fnt1">`
			fontkeys.forEach(key => {
				fetch += `  .${key}{ font-family: '${this.classTemplate.data[key].fontfamily}', sans-serif; }`
			})
			fetch += `</style>`

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