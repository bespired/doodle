<template>
	<section class="dd-size-look widgets" :class="media" v-if="widgetTemplate">

		<draggable
            :group="{ name: 'widget' }"
             handle=".handle"
             v-model="elements"
             class="od-draggables"
             style="min-width: 90%; border: 1px dashed grey; min-height: calc(100vh - 190px);"
            @change="onChange"
        >
            <div
            	v-for="(element, index) in elements"
                :key="`widget-${index}-${widgetTemplate.updated_at}`"
            	class="handle"
            	:class="{selected: element.selected }"
            	@click="toggleSelect(element)" >

                <span class="label">{{ element.label }}</span>

            </div>
        </draggable>

	</section>
</template>

<style>
</style>

<script>
import Vue from 'vue';
export default {
	name: 'section-builder',

	components: {
		draggable: window.vuedraggable,
	},

	beforeMount() {
	},
	destroyed() {
	},

	data(){
		return {
		}
	},

	computed: {

  		widgetTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},

		elements:{
    		get: function () { return this.widgetTemplate.elements },
    		set: function (newValue) {
    			// setting is done in onChange method
 			}
		},

		media(){
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		},

	},

	methods: {

		toggleSelect(element){
			if (element.selected === undefined) element.selected = false
			element.selected = !element.selected

			this.$store.commit('dragrr/touchCurrentTemplate')
		},

		onChange(evt){
            if (evt.hasOwnProperty('added')){
                const freeId= this.freeId()
				const index = evt.added.newIndex
				const local = evt.added.element.handle.split('-')
				const elem  = {
					id:       freeId,
					handle:   `${local[0]}-${local[2]}-${local[1].substr(0,4)}${freeId}`,
    				element:  evt.added.element.handle,
    				name:     evt.added.element.name,
    				label:    evt.added.element.label,
				}
				this.widgetTemplate.elements.splice(index, 0, elem);

            }
            if (evt.hasOwnProperty('moved')){
            	const ondex = evt.moved.oldIndex
				const index = evt.moved.newIndex
				const elem  = evt.moved.element

				this.widgetTemplate.elements.splice(ondex, 1);
				this.widgetTemplate.elements.splice(index, 0, elem);
            }

        },

        freeId(){
            let used= []
            this.elements.forEach((o)=>{ used.push(o.id) })

            let free= this.elements.length;
            while( used.indexOf(free) !== -1 ){ free++ }
            return free;
        }
	}


}
</script>