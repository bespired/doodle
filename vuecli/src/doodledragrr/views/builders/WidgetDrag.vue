<template>
	<section v-if="elementTemplates">
		<!-- <template v-for="(element, idx) in elementTemplates ">
			<div :key="element.handle">
				{{ element.label }}
			</div>
		</template> -->
		<draggable
			:group="{ name: 'widget' }"
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

		<!-- {{ elementTemplates }} -->
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
			// if (evt.hasOwnProperty('added')){
			// 	evt.added.element.id = this.freeId()
			// }
		},
	}


}
</script>