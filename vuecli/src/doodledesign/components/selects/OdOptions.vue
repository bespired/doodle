/* eslint-disable no-alert, no-console */
<template>
    <a :id="$options.namedId" :data-options="`${sname} created`" />
</template>
<script>
import Helpers from '../../helpers/helpers.js'
import Vue     from 'vue'

export default {
    name: 'od-options',
    props: {
        options: {}, // Array, null or undefined...
        sname:   { type: String,  default: null  },
    },
    mounted() {
        if (this.sname !== null) {
            this.$store.commit('doodlegui/setSelectOptions', {
                key: this.sname,
                value: this.options,
            })
        }
    }
}
</script>