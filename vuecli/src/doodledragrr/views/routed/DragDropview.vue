<template>
    <section class="full-height">
        <od-split3-window sizes="small,large,small" types="drag,drop,props" >
            <template #title        >Builder</template>
            <template #subtitle     >{{ $router.currentRoute.name }}</template>
            <template #leftMenu      ><router-view name="leftMenu"      /></template>
            <template #centerMenu    ><router-view name="centerMenu"    /></template>
            <template #rightMenu     ><router-view name="rightMenu"     /></template>
            <template #leftContent   ><router-view name="leftContent"   /></template>
            <template #centerContent ><router-view name="centerContent" /></template>
            <template #rightContent  ><router-view name="rightContent"  /></template>
        </od-split3-window>
    </section>
</template>

<script>

export default {
    name: 'drag-dropview',

   props: ['source'], // router hands the source... like layout...

    mounted(){
        let handle= this.$router.currentRoute.params.id

        this.$store.dispatch(`dragrr/setCurrentTemplate`, { source: this.source, handle: handle })

        let media = this.$store.getters['doodlegui/getRadioState']('devicesize')

        if (!media) {
            this.$store.commit('doodlegui/setRadioState', {
                key: 'devicesize', value: 'desktop',
            })
        }
    },

    beforeUpdate() {
        let handle= this.$router.currentRoute.params.id
        this.$store.dispatch(`dragrr/setCurrentTemplate`, { source: this.source, handle: handle })
    },

    beforeDestroy() {
        this.$store.commit(`dragrr/clearCurrentTemplate`)
    },
}
</script>
