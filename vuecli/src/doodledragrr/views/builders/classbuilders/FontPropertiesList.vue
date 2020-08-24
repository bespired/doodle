<template>
	<div>
		<od-foldable v-if="googleFont && classTemplate && fontWeightOptions" :key="`ufo-${update}`">
			<template v-for="(font,idx) in classTemplate.data">
				<od-fold-header :key="`hdr-${idx}`" :label="label(idx)"  />
				<od-fold-body   :key="`bdy-${idx}`">

					<od-text-input :vmodel="`classTemplate.data.${idx}.fontname`" />
					<od-radiorow>
						<od-radiobox
							:vmodel="`classTemplate.data.${idx}.fontsource`"
							value="googlefont" class="smallest">Google font </od-radiobox>
						<od-radiobox
							:vmodel="`classTemplate.data.${idx}.fontsource`"
							value="localfont" class="smallest">Local font </od-radiobox>
					</od-radiorow>

					<od-data-select
						:options="googleFont"
						:vmodel="`classTemplate.data.${idx}.fontfamily`"
						type="googlefont"
						@changed="changed(idx)"
					/>
					<!-- // if google font... -->
					<od-flex v-if="fontWeightOptions[idx]">
						<od-switch class="flex-1" :vmodel="`fontOn.${idx}`"> font </od-switch>
						<od-select class="flex-2" :vmodel="`fontWeight.${idx}`"
							:key="keyFor('fontWeight', idx)"
							:options-update="optionsUpdate"
							:options="fontWeightOptions[idx]" @changed="setFontWeight(idx)"/>
					</od-flex>
					<od-flex v-if="fontWeightOptions[idx]">
						<od-switch class="flex-1" :vmodel="`fontBold.${idx}`"> bold </od-switch>
						<od-select class="flex-2" :vmodel="`boldWeight.${idx}`"
							:key="keyFor('boldWeight', idx)"
							:options-update="optionsUpdate"
							:options="fontWeightOptions[idx]" @changed="setBoldWeight(idx)"/>
					</od-flex>
					<od-flex v-if="googleFamily(idx).variants.indexOf('italic') > -1">
						<od-switch :vmodel="`fontItalic.${idx}`" @changed="setItalic(idx)"> italic </od-switch>
					</od-flex>

					<od-button class="danger"> Remove </od-button>

				</od-fold-body>
			</template>
		</od-foldable>
		<od-add-shield label="new font" @create="createNew"/>
	</div>
</template>
<style>
	.flex-1 { flex: 1 }
	.flex-2 { flex: 2 }
</style>
<script>
import Vue from 'vue';

export default {
	name: 'font-properties-list',

	beforeMount() {
		this.$store.dispatch('dragrr/getSettings', { source: 'googleFonts', force: false })
		this.addFonts()
	},

	destroyed() {},

	data() {
		return {
			oddeven          : 'odd',
			optionsUpdate    : 0,
			update           : 0,
			currentFont      : {},
			fontWeightOptions: {},
			fontStyles       : {},
			fontWeight       : {},
			boldWeight       : {},
			fontOn           : {},
			fontBold         : {},
			fontItalic       : {},
		}
	},

	computed: {
		classTemplate() {
			return this.$store.getters['dragrr/currentTemplate']
		},
		googleFont() {
			return this.$store.getters['dragrr/getSetting']('googleFonts')
		},
	},

	watch:{
    	classTemplate: {
			deep: true,
			handler(){

				this.update++;
			}
		},
    	googleFont(val){
    		let fontkeys = Object.keys(this.classTemplate.data)
			fontkeys.forEach(key => {
				this.setOptions(key);
			})
    	},
	},

	methods: {

		createNew(evt){
			let newName = evt
			let slug = this.slugify(newName)
    		if ( slug.indexOf('font') === -1 ) newName = newName + ' Font'
    		slug = this.slugify(newName).replace(/\-/g, '')

    		if ( this.classTemplate.data[slug] === undefined )
    		{
    			Vue.set(this.classTemplate.data,slug, {
					label: newName,
					fontfamily: "Open Sans",
					fontname: "Open Sans",
					fontsource: "googlefont",
					fontstyles: "normal",
					fontweight: 400,
    				boldweight: 400,
					system: "serif",
    			})

    			this.setOptions(slug)
    			this.addFonts()

    		}
		},

		setFontWeight(idx){
			this.classTemplate.data[idx].fontweight = this.fontWeight[idx]
			this.addFonts()
		},

		setBoldWeight(idx){
			this.classTemplate.data[idx].boldweight = this.boldWeight[idx]
			this.addFonts()
		},

		setItalic(idx){
			let styles = ['normal']
			if (this.fontItalic[idx]) styles.push('italic')
			this.classTemplate.data[idx].fontstyles = styles.join(',')
			this.addFonts()
		},

		changed(idx){
			// font family change
			this.classTemplate.data[idx].fontname = this.classTemplate.data[idx].fontfamily

			if ((this.fontItalic[idx]) && (this.googleFamily(idx).variants.indexOf('italic') == -1)){
				// italic wanted, but font has no italic... then disable italic.
				this.fontItalic[idx] = false;
				this.classTemplate.data[idx].fontstyles = 'normal'
			}

			let weight = this.classTemplate.data[idx].fontweight;
			if ( weight === 400 ) weight= 'regular'
			if ( this.googleFamily(idx).variants.indexOf(weight) === -1 ){
				this.classTemplate.data[idx].fontweight = this.googleFamily(idx).variants[0]
				if ( this.classTemplate.data[idx].fontweight === 'regular' )
											this.classTemplate.data[idx].fontweight = 400

										console.log('switch to ', this.classTemplate.data[idx].fontweight)
			}

			weight = this.classTemplate.data[idx].boldweight;
			if ( weight === 400 ) weight= 'regular'
			if ( this.googleFamily(idx).variants.indexOf(weight) === -1 ){
				this.classTemplate.data[idx].boldweight = this.googleFamily(idx).variants[0]
				if ( this.classTemplate.data[idx].boldweight === 'regular' )
											this.classTemplate.data[idx].boldweight = 400
			}

			if ( this.classTemplate.data[idx].boldweight === this.classTemplate.data[idx].fontweight ){
				this.fontBold[idx] = false
			}

			this.setOptions(idx)
			this.addFonts()
		},

		keyFor(key, idx){
			return key + '-' + idx + '-' + this[key][idx] + '--' + this.fontWeightOptions[idx].join('-')
		},

		googleFamily(idx) {
			let found= [];
			if (this.classTemplate.data[idx] === undefined ) return []
			let family = this.classTemplate.data[idx].fontfamily
			let keys = Object.keys(this.googleFont.items)
			keys.forEach((key)=>{
				let item = this.googleFont.items[key]
				if ( item.family === family) found.push(item);
			})
			return found.length ? found[0] : []
		},

		label(idx){
			if ( this.classTemplate === undefined) return ''
			return this.classTemplate.data[idx].label
		},

		setOptions(idx){
			// let fontfamily = this.classTemplate.data[idx].fontfamily

			let gogfontfam = this.googleFamily(idx)
			let variants   = gogfontfam.variants
			let id         = 0;
			let weights    = [];

			this.fontWeightOptions[idx] = []
			this.optionsUpdate++;

			for( let v in variants){
				let variant = variants[v]
				let weight  = parseInt(variant)
				if ( variant === 'regular') weight = 400

				if ( (!isNaN(weight)) && (weights.indexOf(weight) == -1 ) ){
					weights.push(weight)
					this.fontWeightOptions[idx].push({
						label:weight, value:weight, id: id++
					})
				}
			}

			if ( this.classTemplate.data === undefined ) return;

			this.classTemplate.data[idx].fontname = gogfontfam.family

			this.fontWeight[idx] = this.classTemplate.data[idx].fontweight
			this.fontOn[idx]     = this.classTemplate.data[idx].fontstyles.indexOf('normal') > -1

			this.boldWeight[idx] = this.classTemplate.data[idx].boldweight
			this.fontBold[idx]   = weights.length > 1 && (this.classTemplate.data[idx].boldweight !== this.classTemplate.data[idx].fontweight)

			this.fontItalic[idx] = this.classTemplate.data[idx].fontstyles.indexOf('italic') > -1

			return 'options set'
		},

		addFonts() {
			let url = 'https://fonts.googleapis.com/css2'
			// let styles = 'ital,wght@0,400;0,700;1,400;1,700'

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

			let fetchFamily = `<link id="draggr-link-fnt" rel="stylesheet" href="${url}?${family}display=block&text=${text}">`

			let fetchStyle = ''
			fontkeys.forEach(key => {
				let style = this.classTemplate.data[key].fontstyles.indexOf('italic') > -1 ? 'italic' : 'normal'

				fetchStyle += `<style id="draggr-style-fnt-${key}">`
				fetchStyle += `  .${key}{ font-family: '${this.classTemplate.data[key].fontfamily}', sans-serif; }`
				fetchStyle += `  .${key} .markdown { font-weight: ${this.classTemplate.data[key].fontweight}; }`
				fetchStyle += `  .${key} .markdown strong { font-weight: ${this.classTemplate.data[key].boldweight}; }`
				fetchStyle += `  .${key} .markdown em { font-style: ${style}; }`
				fetchStyle += `</style>`
			})

			let head = document.head;

			let tempFamily = document.createElement('div');
			tempFamily.innerHTML = fetchFamily

			while (tempFamily.firstChild) {
				head.appendChild(tempFamily.firstChild);
			}

			let tempStyle = document.createElement('div');
			tempStyle.innerHTML = fetchStyle

			while (tempStyle.firstChild) {
				head.appendChild(tempStyle.firstChild);
			}


		}

	},

}
</script>