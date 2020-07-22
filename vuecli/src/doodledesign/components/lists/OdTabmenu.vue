<template>
	<div class="od-tabmenu" v-if="Object.keys(sluggedTabs)">
		<template v-for="(tab, key) in sluggedTabs">
			<span class="od-tabmenu--tab" :class="isSelected(key)" @click="clicked(key)" :key="key">
	        	{{ tab }}
	    	</span>
		</template>
	</div>
</template>

<script>
import Helpers from '../../helpers/helpers.js'

export default {
	name: 'od-tabmenu',
	props: {
        vmodel: { type: String, default: null },
        smodel: { type: String, default: null },
        tabs  : { type: [String, Array, Object], default: null },
    },

   data(){
        return{
        	vparent:     this.$parent,
            sluggedTabs: this.getSluggedTabs(),
            storageName: this.getStorageName(),
            selectState: this.getSelectedState(),
        }
    },

 	methods:{
		isNumeric(n) {
  			return !isNaN(parseFloat(n)) && isFinite(n);
		},
		isAllNumbers(keys) {
			let allNumbers= true
  			keys.forEach((k)=>{
  				if (!this.isNumeric(k)) allNumbers= false
        	})
        	return allNumbers
		},
		createKeys(arr) {
			let obj={}
			Object.keys(arr).forEach((k)=>{
				let key= arr[k].replace(/ /g, '').toLowerCase()
  				obj[key] = arr[k]
        	})
        	return obj
		},

		getSluggedTabs(){
			let slugged= this.tabs
			let keys = typeof this.tabs === 'object' ? Object.keys(this.tabs) : []
        	if (this.isAllNumbers(keys)) slugged= this.createKeys(this.tabs)
        	return slugged
		},

		getStorageName(){
			let name = 'temp'
			if ( this.smodel !== null ) name = this.smodel
			if ( this.vmodel !== null ) name = this.vmodel
        	return `doodle.tab.${name}`
		},

 		getSelectedState(){

			let selectState = this.vmodel ? this.$parent[this.vmodel] : null
        	if (this.smodel) selectState = this.$store.getters['doodlegui/getTabState'](this.smodel)

        	let keys = typeof this.tabs === 'object' ? Object.keys(this.tabs) : []
			if (this.isAllNumbers(keys)) {
				let slugged= this.createKeys(this.tabs)
				keys = Object.keys(slugged)
			}

			if ( selectState === null ) {
				let name = this.getStorageName()
				selectState = localStorage.getItem(name)
			}
			if ( keys.indexOf(selectState) === -1 ) selectState = keys[0]
      		return selectState
 		},

        isSelected(key){
            return this.selectState == key ? 'selected' : ''
        },

        clicked(key){

            this.selectState = key

            localStorage.setItem(this.storageName, this.selectState);

			if (this.vmodel !== null) {
                Helpers.dotset(this.vparent, this.vmodel, key)
                return
            }
            if (this.smodel !== null) {
                this.$store.commit('doodlegui/setTabValue', {
                    key: this.smodel,
                    value: key,
                })
                return
            }

            this.$emit('changed', this.selectState)
            this.$emit('click',   this.selectState)

        }

    }
}
</script>