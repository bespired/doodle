<template>
	<section>
		so yeah... we need pulldown and slider inputs ...
	</section>
</template>
<script>

import Vue from 'vue';
export default {
	name: 'row-properties',

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
					{ id: 1, label: 'Option 1', name: 'option1', value: 'option:1' },
					{ id: 2, label: 'Option 2', name: 'option2', value: 'option:2' },
					{ id: 3, label: 'Option 3', name: 'option3', value: 'option:3' },
				]
			}
		},
		onClone(item) {
			let cloneMe = JSON.parse(JSON.stringify(item));
			cloneMe.id = 0

			return cloneMe;
		},

	},



}
</script>