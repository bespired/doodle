<template>
    <section class="od-browser-look">
        <div class="dot"></div><div class="dot"></div><div class="dot"></div>
        <div class="od-url-area"><div class="od-url-bar">
            http://
        </div></div>
        <draggable
            :group="{ name: 'layout' }"
            @change="onChange"
             handle=".handle"
             v-model="selectedOptions"
             class="od-draggables"
        >
            <div class="handle" v-for="(option, index) in selectedOptions"
                :key="`page-${option.id}`">
                <span class="subhandle" :data-id="option.id">{{ option.label }}</span>
            </div>
        </draggable>
    </section>
</template>
<script>

import Vue from 'vue';
export default {
    name: 'page-builder',

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