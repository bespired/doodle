<template>
    <section class="schemafiller" v-if="widgetTemplate">
        <template v-for="(row, idx) in widgetElements">
            <div class="row" :key="`row-${idx}`" :data-row="`${idx}`">
                <template v-for="(column, jdx) in row">
                    <div :class="`column width-${column.width}`"
                         :key="`${idx}-${jdx}`"
                         :data-column="`${idx}-${jdx}`">
                         <div :data-fakevalue="setDummy(column)">

                            <od-text-input  v-if="column.input == 'text'"     :vmodel="`dummy.${column.attrib}`" :label="column.label"/>
                            <od-text-area   v-if="column.input == 'markdown'" :vmodel="`dummy.${column.attrib}`" :label="column.label"/>
                            <draggr-image-input
                                v-if="column.input == 'image'"
                                    :owner = "`dummy-${column.attrib}-image`"
                                    :label = "column.label"
                                />
                            <draggr-link-input
                                v-if="column.input == 'button'"
                                :owner = "`dummy-${column.attrib}`"
                                :label = "column.label"
                            />
                         </div>
                    </div>
                </template>
            </div>
        </template>
    </section>
</template>

<style>
    .schemafiller { padding: 30px; }
    .schemafiller .input-group input { width: 100%; }
    .schemafiller .row       { display:flex; }
    .schemafiller .column    { display:flex; flex-direction: column;}
    .schemafiller .width-100 { flex-grow: 1; padding-right: 8px; }
    .schemafiller .width-50  { flex-grow: 50; padding-right: 8px; }
    .schemafiller .width-33  { flex-grow: 33; padding-right: 8px; }
    .schemafiller .width-25  { flex-grow: 25; padding-right: 8px; }
    .schemafiller .width-30  { width:  30%; padding-right: 8px; }
    .schemafiller .width-70  { width:  70%; padding-right: 8px; }
</style>

<script>
import Vue from 'vue';
import draggable from 'vuedraggable'

import DraggrImageInput from '@dragrr/components/DraggrImageInput'
import DraggrLinkInput  from '@dragrr/components/DraggrLinkInput'

export default {
    name: 'widget-builder-preview',

    components: {
        draggable,
        DraggrImageInput,
        DraggrLinkInput,
    },

    beforeMount() {
    },
    destroyed() {
    },

    data(){
        return {
            dummy: {}
        }
    },

    computed: {
        widgetTemplate(){
            return this.$store.getters['dragrr/currentTemplate']
        },

        widgetElements:{
            get: function () { return this.widgetTemplate.elements },
            set: function (newValue) { }
        },

    },

    methods: {
        setDummy(column){
            switch(column){
                case 'text':     this.dummy[column.attrib] = attrib; break;
                case 'markdown': this.dummy[column.attrib] = attrib; break;
                case 'image':    this.dummy[column.attrib] = { link: '', alt: '' }; break;
                case 'button':   this.dummy[column.attrib] = { link: '#', text: 'button',  target: '' }; break;
            }
        }
    }

}
</script>
