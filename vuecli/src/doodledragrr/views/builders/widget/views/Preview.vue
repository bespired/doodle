<template>
    <section class="widget-builder" v-if="widgetTemplate">

            <template v-for="(row,idx) in widgetElements">
                <div class="row" :class="`kids-${row.length}`" :key="`row-${idx}`" >

                    <template v-for="(column,jdx) in row">
                        <span class="column" :key="`column-${idx}-${jdx}`" :class="`width-${column.width}`">
                            <div class="column-content">
                                <div class="type">
                                    <od-iconpath :name="textToIcon[column.input]" />
                                </div>
                                <div class="buttons">
                                    <od-text-input mini :vmodel="`widgetElements.${idx}.${jdx}.label`"  label="label"     :inset="true" />
                                    <od-text-input mini :vmodel="`widgetElements.${idx}.${jdx}.attrib`" label="attribute" :inset="true" />
                                </div>
                            </div>

                        </span>
                    </template>


                </div>
            </template>

    </section>
</template>

<script>
import Vue from 'vue';
import draggable from 'vuedraggable'


export default {
    name: 'widget-builder-preview',

    components: {
        draggable: draggable,
    },

    beforeMount() {
    },
    destroyed() {
    },

    data(){
        return {
            dragover: null,
            textToIcon:{
                markdown: 'markdown',
                text:     'text',
                image:    'image',
                button:   'button',
            }
        }
    },

    computed: {
        widgetTemplate(){
            return this.$store.getters['dragrr/currentTemplate']
        },

        elementTemplates(){
            return this.$store.getters['dragrr/getElementTemplates']
        },

        dragging(){
            return this.$store.getters['dragrr/getDragging']
        },

        widgetElements:{
            get: function () { return this.widgetTemplate.elements },
            set: function (newValue) { }
        },

    },

    methods: {
        mouseover(idx){
            this.dragover = idx + 1
        },
        mouseleave(idx){
            this.dragover = -idx
        },
        isDragover(idx){
            return idx === ( this.dragover - 1 ) ? 'hover' : ''
        },
        trash(idx, jdx){
            if ( jdx === undefined ) {
                 this.widgetElements.splice(idx, 1)
            }else{
                this.widgetElements[idx].splice(jdx, 1)
                this.spread(idx)
            }
        },
        duplicate(idx, jdx){
            if ( jdx === undefined ) {
                let another= this.clonedub(this.widgetElements[idx])
                this.widgetElements.splice(idx, 0, another)
            }else{
                let another= this.clonedub(this.widgetElements[idx][jdx])
                this.widgetElements[idx].push(another)
                this.spread(idx)
            }
        },
        layout(idx){
            let layouts= []
            this.widgetElements[idx].forEach((e)=>{ layouts.push(e.width) })
            let layout= layouts.join('-')
            if ( layout === '50-50' ) { layouts[0]= 30; layouts[1]= 70; }
            if ( layout === '30-70' ) { layouts[0]= 70; layouts[1]= 30; }
            if ( layout === '70-30' ) { layouts[0]= 50; layouts[1]= 50; }
            this.widgetElements[idx].forEach((e, i)=>{ e.width = layouts[i] })
        },
        spread(idx){
            let count= this.widgetElements[idx].length
            this.widgetElements[idx].forEach((e)=>{ e.width = Math.floor(100 / count) })
        },

    }

}
</script>
