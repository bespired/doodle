<template>
    <section class="dd-size-look pages" :class="media" :data-load="load">
        <iframe id="content" :data-page="htmlPage" />
        <od-loading style="margin-top: 80px" v-if="htmlPage === 0"/>
    </section>
</template>

<script>
import Vue     from 'vue';

export default {
    name: 'page-content',

    data(){
        return {
        }
    },

    computed: {
        pageTemplate() {
            return this.$store.getters['dragrr/currentTemplate']
        },

        htmlPage() {
            const html   = this.$store.getters['dragrr/getHtmlPage']
            if ((html === null) || (html === undefined))return 0

            const blob   = new Blob([html], {type: 'text/html'})
            const iframe = document.getElementById('content')
            if (iframe) iframe.src = window.URL.createObjectURL(blob)

            return html.length
        },

        media() {
            return this.$store.getters['doodlegui/getRadioState']('devicesize')
        },

        load() {
            if ( this.pageTemplate === null ) return null

            let pathslug = this.pageTemplate.pathslug
            this.$store.dispatch('dragrr/loadPage', pathslug)
            return pathslug
        },
    },

    methods: {
    }

}
</script>

<style>

    .pages{
        position   : relative;
        display    : flex;
        width      : 100%;
        min-height : calc(100vh - 187px);
        overflow   : hidden;
        background-color : #eaeaea;
        --scale: 0.7;
        --transx:  0;
    }

    @media (max-width: 1345px), (max-height: 730px){ .pages{ --scale: 0.5; } }
    @media (max-width: 1345px) { .pages{ --transx: -420px; } }

    #content{
        position   : absolute;
        left       : 0;
        right      : 0;
        top        : 0;
        bottom     : 0;
    }

    iframe{
        border     : 0;
        width      : 100%;
        height     : 100%;
        /*transform-origin: 50% 0;*/
    }

    .pages.mobile iframe{  width: 480px; margin: 0 auto; }
    .pages.tablet iframe{  width: 1024px; height: 768px; margin: auto; transform: scale(var(--scale)) translateX(var(--transx)) }



</style>