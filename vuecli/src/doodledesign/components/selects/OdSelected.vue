/* eslint-disable no-alert, no-console */
<template>
    <a :id="$options.namedId" :data-selected="`'${sname}' created`" :data-value="JSON.stringify(storevalue)"/>
</template>
<script>
import Helpers from '../../helpers/helpers.js'
import Vue     from 'vue'

export default {
    name: 'od-selected',
    props: {
        value: {}, // Array, null or undefined...
        sname: { type: String,  default: null  },
    },
    created() {
        if (this.sname !== null) {
            console.log('set ', this.sname, this.value)
            this.$store.commit('doodlegui/setSelectValue', {
                key: this.sname,
                value: this.value,
            })
        }
    },
    computed:{
        storevalue(){
            return this.$store.getters['doodlegui/getSelectValue'](this.sname)
        }
    }
}
</script>