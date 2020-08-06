<template>
	<div class="od-action-row" v-if="compared">
		<od-button
			@click="$emit('click')"
			:class="type" class="left-icon" :icons="`${icon},${icon}`">
			{{ label }}
		</od-button>
	</div>
</template>
<script>
export default {
	name: 'od-action',
	props: {
		type   : String,
		panel  : String,
		label  : String,
		icon   : String,
		thumbs : String,
	},

	computed: {
		// tabmenu(){
  //           let tabs = {}
  //           let keys = Object.keys(this.items)
  //           keys.forEach((key)=>{
  //               let item = this.items[key]
  //               if ( item.hasOwnProperty('area') ) {
  //                   tabs.all= 'All'
  //                   tabs[item.area]= item.area
  //               }
  //           })
  //           return tabs
  //       },
		compared(){
			if (this.thumbs === undefined) return true;
			let number  = this.thumbs
			let compare = '='
			if (this.thumbs.substr(0,1) === '=') { compare= '='; number= number.substr(1, number.length) }
			if (this.thumbs.substr(0,1) === '>') { compare= '>'; number= number.substr(1, number.length) }
			let value = parseInt(number, 10)

			switch(compare){
				case '=': return this.selectedThumbsAmount === value;
				break;
				case '>': return this.selectedThumbsAmount > value;
				break;
			}
			return false
		},

		selectedIndex(){
			return this.$store.getters['doodlegui/getSelectedIndex']
		},
		selectedThumbsAmount(){
			let selected= this.selectedIndex
			if ( selected === undefined ) return 0
			return selected.length
		},
	},
};
</script>