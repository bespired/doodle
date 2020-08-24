/* eslint-disable no-alert, no-console */
<template>
    <span>to do</span>
</template>
<script>

import Helpers     from '../../helpers/helpers.js'
import Multiselect from "vue-multiselect"
import Vue         from 'vue'

// Select from an Object, store in model or store

export default {
    name: 'od-select-object-value',

    components: {
        Multiselect
    },

    props: {
        value:        { },
        options:      { type: Object,  default: null  },
        placeholder:  { type: String,  default: null  },
        vmodel:       { type: String,  default: null  },
        smodel:       { type: String,  default: null  },
        label:        { type: String,  default: null  },
        prefix:       { type: String,  default: null  },
        minWidth:     { type: String,  default: null  },
        required:     { type: Boolean, default: false },
    },

    data() {
        let vparent = this.$parent
        if (this.vmodel){ vparent = Helpers.findParent(this.$parent, this.vmodel) }

        return {
        }
    },

    methods: {
    },


}
</script>