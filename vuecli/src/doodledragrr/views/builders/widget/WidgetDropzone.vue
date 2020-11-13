<template>
    <section>
        <!-- pick a view -->
        <widget-preview v-if="preview=='preview'" />
        <widget-builder v-else />
    </section>
</template>
<script>


import WidgetBuilder  from './views/Builder.vue'
import WidgetPreview  from './views/Preview.vue'

export default {
    name: 'widget-dropzone',

    components: {
        WidgetBuilder, WidgetPreview
    },

    mounted() {
        let viewState = this.$store.getters['doodlegui/getRadioState']('preview')
        if ( viewState === false ){
            this.$store.commit('doodlegui/setRadioState', {
                key: 'preview', value: 'layout',
            })
        }
    },

    beforeDestroy() {
    },

    data(){
        return {
        }
    },

    computed: {
        preview(){
            return this.$store.getters['doodlegui/getRadioState']('preview')
        },
    },

    methods:{
    }

}
</script>