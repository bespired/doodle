<template>
	<section>
		<!-- <draggable
			:group="{ name: 'layout', pull: 'clone', put: false }"
			:sort ="false"
			 handle=".handle"
			 v-model="selectedOptions"
			 class="od-draggables"
			 :clone="onClone"
			>
			<div class="" v-for="(option, index) in selectedOptions" :key="`org-${option.id}`">
				<span class="handle" style="min-width: 30%">{{ option.label }}</span>
			</div>
		</draggable> -->
	</section>
</template>
<script>

import Vue from 'vue';
export default {
	name: 'row-legenda',

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