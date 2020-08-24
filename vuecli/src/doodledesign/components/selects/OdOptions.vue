/* eslint-disable no-alert, no-console */
<template>
    <a :id="$options.namedId" :data-options="`${sname} created`" />
</template>
<script>

export default {
    name: 'od-options',
    props: {
        options: {}, // Array, null or undefined...
        sname:   { type: String,  default: null  },
    },
    created() {
        if (this.sname !== null) {
            console.log('set ', this.sname, this.options)
            this.$store.commit('doodlegui/setSelectOptions', {
                key: this.sname,
                value: this.options,
            })
        }
    }
}
</script>