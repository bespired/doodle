<template>
	<section v-if="elementTemplates" >
		<draggable
			:group="{ name: 'widget', pull: 'clone' }"
			@change="onChange"
			 handle=".handle"
			 v-model="elementTemplates"
			 class="od-draggables"
		>
			<div class="handle" v-for="(element, idx) in elementTemplates"
				:key="element.handle">
				<od-iconpath :name="element.icon" />
				<span class="label">{{ element.label }}</span>
			</div>
		</draggable>

		<div class="od-bottom-menu" v-if="hasSelected" >
			<od-action @click="remove" label="Delete selected" icon="trash" type="danger"/>
		</div>

	</section>
</template>
<script>

import Vue from 'vue';
export default {
	name: 'widget-draggables',

	components: {
		draggable: window.vuedraggable,
	},

	created() {
	},

	beforeDestroy() {
	},

	data(){
		return {
			hasSelected : false
		}
	},

	computed: {
		elementTemplates: {
    		get: function () { return this.$store.getters['dragrr/getElementTemplates'] },
    		set: function (newValue) {  }
  		},

		widgetTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},

	},
	watch: {
    	widgetTemplate: {
      		deep: true,
      		handler(){
      			let elements = this.widgetTemplate.elements
  				let selected = 0
				elements.forEach((elm)=>{
					selected += elm.selected ? 1 : 0
				})
				this.hasSelected = selected > 0
			}
    	}
  	},
	methods:{
		remove(){
			console.log('remove pressed');
			let remove= []
			this.widgetTemplate.elements.forEach((elm, idx)=>{
				if (( elm.selected !== undefined ) && (elm.selected)){
					remove.push(elm.handle)
				}
			})
			while (remove.length > 0){
				let handle= remove.pop();
				this.widgetTemplate.elements.forEach((elm, idx)=>{
					if (elm.handle === handle){
						this.widgetTemplate.elements.splice(idx, 1);
					}
				})
			}

		},
		onChange(evt){
		},
	}


}
</script>