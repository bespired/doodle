/* eslint-disable no-alert, no-console */
<template>
    <div class="input-select-group" >

        <label :for="$options.namedId">
            {{ label }}
        </label>

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
        />

        <multiselect
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
        />
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
        options:      {}, // Array, null or undefined...
        placeholder:  { type: String,  default: null  },
        vmodel:       { type: String,  default: null  },
        smodel:       { type: String,  default: null  },
        soptions:     { type: String,  default: null  },
        value:        { type: String,  default: null  },
        label:        { type: String,  default: null  },
        required:     { type: Boolean, default: false },
        single:       { type: String,  default: null  },
        list:         { type: String,  default: null  },
    },

    data() {

        return {
            labelby    : "label",
            trackby    : "id",
            isTags     : this.$attrs.tags   !== undefined,
            isMultiple : this.$attrs.tags !== undefined,
            isCustom   : this.single !== null,
            isTaggable : false, // true to create new tags...
            vparent    : this.$parent,
            theme      : this.$vnode.data.staticClass,
            byholder   : this.placeholder ? this.placeholder : 'Select option',
        }
    },

    methods: {
        addTag (newTag) {
            // const tag = {
            //     label: newTag,
            //     value: newTag,
            //     id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            // }
            // this.options.push(tag)
            // this.value.push(tag)
        },

    },

    computed: {
        modelOptions(){
            if (this.soptions)
                return this.$store.getters['doodlegui/getSelectOptions'](this.soptions)
            if ( this.options === undefined ) return []
            return this.options
        },
        modelValue: {
            get() {
                // check if its in the options... if not ... then what?
                if (this.vmodel) {
                    let value = null;

                    if (this.vparent === undefined) value = this.$parent[this.vmodel]
                    else value = Helpers.dotget(this.vparent, this.vmodel)

                    if ( typeof value !== 'object' ){
                        const isValue = this.modelOptions.filter(obj => {
                            return obj.value.toString() === value.toString()
                        })
                        if ( isValue.length ) return isValue;

                        const isId = this.modelOptions.filter(obj => {
                            return obj.id.toString() === value.toString()
                        })
                        if ( isId.length ) return isId;
                    }

                    return value
                }
                if (this.smodel) return this.$store.getters['doodlegui/getSelectValue'](this.smodel)
                return null
            },
            set(value) {
                if (this.vmodel !== null) {
                    Helpers.dotset(this.vparent, this.vmodel, value)
                    return
                }
                if (this.smodel !== null) {
                    this.$store.commit('doodlegui/setSelectValue', {
                        key: this.smodel,
                        value: value,
                    })
                    return
                }
                this.$emit('changed', value)
            }
        }
    },


}
</script>