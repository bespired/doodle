/* eslint-disable no-alert, no-console */
<template>
    <div class="input-select-group" :class="prefixer()">

        <label :for="$options.namedId" v-if="label">
            {{ label }}
        </label>

        <span class="prefix" v-if="prefix!==null">{{ prefix }}</span>
        <multiselect
            :id="$options.namedId"
            class="od-select"
            v-model="modelValue"
            :placeholder="byholder"
            :options="modelOptions"
            :allow-empty="false"
            :label="labelby"
            :track-by= "trackby"
        />
    </div>
</template>
<script>

import Helpers     from '../../helpers/helpers.js'
import Multiselect from "vue-multiselect"
import Vue         from 'vue'

export default {
    name: 'od-data-select',

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
        type:         { type: String,  default: null  },
    },

    data() {
        let vparent = this.$parent
        if (this.vmodel){ vparent = Helpers.findParent(this.$parent, this.vmodel) }

        return {
            labelby    : this.labelBy(),
            trackby    : this.trackBy(),
            isTags     : this.$attrs.tags   !== undefined,
            isMultiple : this.$attrs.tags !== undefined,
            isCustom   : this.single !== null,
            isTaggable : false, // true to create new tags...
            vparent    : vparent,
            theme      : this.$vnode.data.staticClass,
            byholder   : this.placeholder ? this.placeholder : 'Select option',
            react      : this.valueBy(),
        }
    },

    methods: {
        valueBy(){
            if (this.type === 'googlefont') return "family"
            return "id"
        },
        labelBy(){
            if (this.type === 'googlefont') return "family"
            return "label"
        },
        trackBy(){
            if (this.type === 'googlefont') return "family"
            return "id"
        },
        prefixer() {
            let prefixer = this.prefix  === null ? 0 : this.prefix.length
            let prefixLength = Math.max(this.minWidth, Math.ceil(prefixer / 3))
            return this.prefix  === null ? '' : 'prefix prefix-' + prefixLength
        },
     },

    computed: {
        modelOptions(){
//            console.log('modelOptions: ', this.type, this.options)

            if (this.options === undefined) return []

            if (this.type === 'googlefont') return this.options.items

            if (this.soptions)
                return this.$store.getters['doodlegui/getSelectOptions'](this.soptions)
            if ( this.options === undefined ) return []
            if ( Array.isArray(this.options) ){
                return this.options
            }
            return this.options
        },

        modelValue: {
            get() {

                // check if its in the options... if not ... then what?
                if (this.vmodel) {
                    const value = Helpers.dotget(this.vparent, this.vmodel)
                    const isValue = this.modelOptions.filter(obj => {
                        return obj.family === value
                    })
                    if ( isValue.length ) return isValue[0];

                }

                if (this.smodel) {
                    ////// if Row: then get the getRowValue ...
                    if ( this.smodel.indexOf(':') !== -1 ){
                        const regex = /([\S]*):([\S]*)/gm;
                        const m = regex.exec(this.smodel)
                        if (m[1] === 'row') {
                            const value = this.$store.getters['doodlegui/getRadioState'](m[2])
                            const result = this.modelOptions.filter(option => option.id === value);
                            return result.length ? result[0] : null
                        }
                        if (m[1] === 'select') return this.$store.getters['doodlegui/getSelectValue'](m[2])
                        return null;
                    }

                    return this.$store.getters['doodlegui/getSelectValue'](this.smodel)

                }

                return null
            },
            set(value) {
                // console.log( this.vparent, this.vmodel, value )
                // return;

                if ( this.react !== ''){
                    value = value[this.react]
                }

                if (this.vmodel !== null) {
                    Helpers.dotset(this.vparent, this.vmodel, value)
                    this.$emit('changed', value)
                    return
                }
                if (this.smodel !== null) {

                    if ( this.smodel.indexOf(':') !== -1 ){
                        const regex = /([\S]*):([\S]*)/gm;
                        const m = regex.exec(this.smodel)
                        if (m[1] === 'row') {
                            this.$store.commit('doodlegui/setRadioState', {
                                key: m[2],
                                value: value,
                            })
                        }
                        return
                    }

                    this.$store.commit('doodlegui/setSelectValue', {
                        key: this.smodel,
                        value: value,
                    })
                    this.$emit('changed', value)
                    return
                }
                this.$emit('changed', value)
            }
        }
    },


}
</script>