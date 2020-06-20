<template>
	<section v-if="elementTemplates">
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
		}
	},

	computed: {
		elementTemplates: {
    		get: function () { return this.$store.getters['dragrr/getElementTemplates'] },
    		set: function (newValue) {  }
  		},
	},

	methods:{
		onChange(evt){
		},
	}


}
</script>