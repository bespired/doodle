/* eslint-disable no-alert, no-console */
<template>
    <div class="input-select-group" :class="prefixer()">

        <label :for="$options.namedId" v-if="label">
            {{ label }}
        </label>

        <span class="prefix" v-if="prefix!==null">{{ prefix }}</span>
        <multiselect
            v-if="!isTags && !isCustom"
            :id="$options.namedId"
            class="od-select"
            v-model="modelValue"
            :placeholder="byholder"
            :options="modelOptions"
            :allow-empty="false"
            :label="labelby"
            :track-by= "trackby"
            @input="alter"
        />

        <!-- <multiselect
            v-if="isTags"
            :id="$options.namedId"
            class="od-select"
            v-model="modelValue"
            :placeholder="byholder"
            :options="modelOptions"
            :label="labelby"
            :track-by= "trackby"
            :multiple="isMultiple"
            :taggable="isTaggable"
            @tag="addTag"
        /> -->
    </div>
</template>
<script>

import Helpers     from '../../helpers/helpers.js'
import Multiselect from "vue-multiselect"
import Vue         from 'vue'

export default {
    name: 'od-select',

    components: {
        Multiselect
    },

    props: {
        options:      { }, // Array, null or undefined...
        placeholder:  { type: String,  default: null  },
        vmodel:       { type: String,  default: null  },
        smodel:       { type: String,  default: null  },
        soptions:     { type: String,  default: null  },
        value:        { type: String,  default: null  },
        label:        { type: String,  default: null  },
        prefix:       { type: String,  default: null  },
        minWidth:     { type: String,  default: null  },
        required:     { type: Boolean, default: false },
        single:       { type: String,  default: null  },
        list:         { type: String,  default: null  },
    },

    data() {
        let vparent = this.$parent
        if (this.vmodel){ vparent = Helpers.findParent(this.$parent, this.vmodel) }

        return {
            labelby    : "label",
            trackby    : "value",
            isTags     : this.$attrs.tags !== undefined,
            isMultiple : this.$attrs.tags !== undefined,
            isCustom   : this.single !== null,
            isTaggable : false, // true to create new tags...
            vparent    : vparent,
            theme      : this.$vnode.data.staticClass,
            byholder   : this.placeholder ? this.placeholder : 'Select option',
            react      : 'value',

            modelValue : this.initialValue()
        }
    },

    methods: {
        addTag (newTag) {
        },

        prefixer() {
            let prefixer = this.prefix  === null ? 0 : this.prefix.length
            let prefixLength = Math.max(this.minWidth, Math.ceil(prefixer / 3))
            return this.prefix  === null ? '' : 'prefix prefix-' + prefixLength
        },

        alter(value, id){
            // console.log(value, id)
            let setvalue = (this.react !== '') ? value[this.react] : value

            if (this.vmodel !== null) {
                Helpers.dotset(this.vparent, this.vmodel, setvalue)
                this.$emit('changed', setvalue)
                return
            }

            if (this.smodel !== null) {
                this.$store.commit('doodlegui/setSelectValue', {
                    key: this.smodel,
                    value: setvalue,
                })
                this.$emit('changed', setvalue)
                return
            }

            this.$emit('changed', setvalue)

        },

        initialValue(){
            if (this.vmodel !== null) {
                let vparent  = this.$parent
                let loptions = this.options
                let value    = 0

                if (this.vmodel){
                    vparent = Helpers.findParent(this.$parent, this.vmodel)
                    value   = Helpers.dotget(vparent, this.vmodel)
                }

                if (this.soptions)
                    loptions= this.$store.getters['doodlegui/getSelectOptions'](this.soptions)

                if ( loptions === undefined ) return {}

                const isValue = loptions.filter(obj => {
                    return obj.value.toString() === value.toString()
                })
                if ( isValue.length ) {
                    this.trackby = 'value'
                    return isValue[0]
                }
                // track by id ??? ___
                // given value is already an object ...

                return { label: '?', value: 0, id: 0 }
            }
        },
     },

    computed: {
        modelOptions(){
            if (this.soptions)
                return this.$store.getters['doodlegui/getSelectOptions'](this.soptions)
            return this.options
        },

    },


}
</script>