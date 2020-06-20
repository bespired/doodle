<template>
	<section class="dd-size-look sections" :class="media" v-if="sectionTemplate">
		<section v-html="cssFile()"/>
		<template v-for="(row, idx) in sectionTemplate.rows">
			<div class="row" :key="`row-${idx}`">
				<template v-for="(space, inx) in row.spaces">
					<div class="column"
						:class="respconv(row, space)"
						:key="`row-${idx}-column-${inx}`">
						<div>{{ space.widget }}</div>
						<div class="contentType" :class="space.content">{{ space.content }}</div>
					</div>
				</template>
			</div>
		</template>
	</section>
</template>

<style>
	.sections{ padding: 20px }
	.sections .row{
		border: 1px solid blue;
		margin-top: -1px; /* for overlap */
		padding: 8px;
		display: flex;
		flex-wrap: wrap;
	}
	.sections .column{
		background-color: #e4e4e4;
		border: 1px solid black;
	    margin-top: -1px;  /* for overlap */
	    margin-left: -1px; /* for overlap */
    	padding: 4px;
    	position: relative;
    	padding: 4px 0 0 16px;
    	min-height: 40px;
	}
	.sections .contentType{
		position: absolute;
		top:0; right:0;
		padding: 0 8px 0 9px;
		color: white;
		font-size: 12px;
		border-bottom-left-radius: 4px;
	}
	.contentType.fixed{ background-color: darkgrey; }
	.contentType.magnet{ background-color: #d08f00; }
	.contentType.collection{ background-color: #55abb9; }
	.contentType.segment{ background-color: #66bd56; }
</style>

<script>
import Vue from 'vue';
export default {
	name: 'section-builder',

	// components: {
	// 	draggable: window.vuedraggable,
	// },

	beforeMount() {
		this.selectedOptionList= this.initialSelectedOptionList()
	},
	destroyed() {
		this.selectedOptionList= null
	},

	data(){
		return {
			selectedOptionList: null,
			mediaquery: {
				mobile : {},
				tablet : {},
				desktop: {},
				xlarge : {},
			}
		}
	},

	computed: {
  		sectionTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},
  		layoutTemplates(){
			return this.$store.getters['dragrr/getLayoutTemplates']
		},
		media(){
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		}

  //    selectedOptions: {
  //   		get: function () { return this.selectedOptionList.options },
  //   		set: function (newValue) { this.selectedOptionList.options = newValue }
  // 	},

	},

	methods: {
		// layoutTemplate(name){
		// 	return this.$store.getters['dragrr/getLayoutTemplate'](name)
		// },

		respconv(row, arr){
			const className = 'col-' + arr.widths.join('-').replace(/%/g, '')
			// col-100-50-25-25
			// if this size is same as prev size ... then not needed really...
			this.mediaquery.mobile [className] = "width: " + arr.widths[0]
			this.mediaquery.tablet [className] = "width: " + arr.widths[1]
			this.mediaquery.desktop[className] = "width: " + arr.widths[2]
			this.mediaquery.xlarge [className] = "width: " + arr.widths[3]

			return className
		},

		cssFile(){
			let styles = ''
			let keys= Object.keys(this.mediaquery[this.media])
			keys.forEach( key => {
				styles += `.sections .column.${key}{ ${this.mediaquery[this.media][key]} } `
			})

			return `<style>${styles}</style>`
		},

		initialSelectedOptionList() {
			return {
				options: [
					{ id: 1, label: 'Option 1', name: 'option1', value: 'option::1' },
					{ id: 3, label: 'Option 2', name: 'option2', value: 'option::3' },
					{ id: 5, label: 'Option 3', name: 'option3', value: 'option::5' },
				]
			}
		},
	},

}
</script>