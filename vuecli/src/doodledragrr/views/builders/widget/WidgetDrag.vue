<template>
    <section class="widget-legenda">

        <draggable
            :sort="false"
            :group="{ name: 'column', pull: 'clone', put: false }"
            handle=".select"
            ghost-class="ghost"
            @start="startDrag"
            @end="endDrag"
        >
            <template v-for="(column, name) in elements">
                <div class="select" :key="`select-${name}`" :data-type="name">
                    <div class="type">
                        <od-iconpath :name="name" />
                    </div>
                    <div class="buttons">
                        {{ name }}
                    </div>
                </div>
            </template>

        </draggable>

    </section>
</template>
<script>

import Vue from 'vue';
import draggable from 'vuedraggable'

export default {
    name: 'widget-draggables',

    components: {
        draggable:draggable
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
        elements(){
            return this.$store.getters['dragrr/getElements']
        },
    },

    methods:{

        startDrag(evt){
             this.$store.commit('dragrr/setDragging', true)
        },
        endDrag(evt){
            this.$store.commit('dragrr/setDragging', false)
            this.$store.commit('dragrr/swapDropped', evt)
        },

    }

}
</script>