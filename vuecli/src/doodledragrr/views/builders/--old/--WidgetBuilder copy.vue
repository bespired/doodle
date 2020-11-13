<template>
    <section class="dd-size-look widgets" :class="[media, {frame:!media}]" v-if="widgetTemplate">
        <div >
            <draggable
                :group="{ name: 'widget' }"
                 handle=".handle"
                 v-model="widgetElements"
                 class="od-draggables"
                @change="onChange"
            >
                <div
                    v-for="(elem, index) in widgetElements"
                    :key="`widget-${index}-${widgetTemplate.updated_at}`"
                    class="handle"
                    :class="{ selected: elem.selected }"
                    @click="toggleSelect(elem)" >

                    <span class="label">{{ elem.label }}</span>
                    <span class="content" v-html="element(elem)" />

                </div>
            </draggable>
        </div>
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

        elementTemplates(){

            return this.$store.getters['dragrr/getElementTemplates']
        },

        widgetElements:{
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

        element(elem){
            if ( this.elementTemplates === null ) return ''

            let element = this.elementTemplates.find( f => { return f.handle === elem.element })
            let otml    = element.otml

            console.log(element.name)

            otml = otml.replace(/\[class\]/,  element.name)
            otml = otml.replace(/\[text\]/,  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
            otml = otml.replace(/\[title\]/, 'Lorum Ipsum')
            otml = otml.replace(/\[image\]/, 'https://images.unsplash.com/photo-1592963871802-3de984041fd6?h=200')
            otml = otml.replace(/\[link\]/, '#')

            return otml
        },

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