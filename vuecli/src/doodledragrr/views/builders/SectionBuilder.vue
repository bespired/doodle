<template>
	<section class="dd-size-look">

<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 1000 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" >

    <rect x="0" y="0" width="1000" height="5000" class="row-background-color"/>

</svg>
		<!-- <draggable
			 v-model="selectedOptions"
			:group="{ name: 'layout' }"
			 handle=".handle"
			 class="dd-draggables"
			@change="onChange"
		>
			<template v-for="(option, index) in selectedOptions" >
				<div class="dd-flexboxgrid" :data-id="option.id" :key="`page-${option.id}`">
					<div class="handle"  >{{ option.label }}</div>
					<div class="content" > ... content items ...</div>
				</div>
			</template>

		</draggable> -->
	</section>
</template>
<style>
.row-background-color {
 	fill:rgb(180,180,180);
 }
</style>

<script>
import Vue from 'vue';
export default {
	name: 'section-builder',

	components: {
		draggable: window.vuedraggable,
	},

	beforeMount() {
		this.selectedOptionList= this.initialSelectedOptionList()
	},
	destroyed() {
		this.selectedOptionList= null
	},

	data(){
		return {
			selectedOptionList: null
		}
	},

	computed: {
		selectedOptions: {
    		get: function () { return this.selectedOptionList.options },
    		set: function (newValue) { this.selectedOptionList.options = newValue }
  		},
	},

	methods: {

		initialSelectedOptionList() {
			return {
				options: [
					{ id: 1, label: 'Option 1', name: 'option1', value: 'option::1' },
					{ id: 3, label: 'Option 2', name: 'option2', value: 'option::3' },
					{ id: 5, label: 'Option 3', name: 'option3', value: 'option::5' },
				]
			}
		},

		onChange(evt){
			if (evt.hasOwnProperty('added')){
				evt.added.element.id = this.freeId()
			}
		},

		freeId(){
			let used= []
			this.selectedOptions.forEach((o)=>{ used.push(o.id) })

			let free= this.selectedOptions.length;
			while( used.indexOf(free) !== -1 ){ free++ }
			return free;
		}


	},



}
</script>