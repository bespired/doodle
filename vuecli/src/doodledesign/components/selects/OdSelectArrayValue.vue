/* eslint-disable no-alert, no-console */
<template>
        <multiselect
            class="od-select"
            :id="$options.namedId"
            :placeholder="byholder"
            v-model="modelValue"
            :options="modelOptions"
            :allow-empty="false"
            :label="labelby"
            :track-by= "trackby"
            @input="alter"
        />
</template>
<script>

import Helpers     from '../../helpers/helpers.js'
import Multiselect from "vue-multiselect"
import Vue         from 'vue'

// Select from an Object from an Array, store in model or store

export default {
    name: 'od-select-array-value',

    components: {
        Multiselect
    },

    props: {
        options:      { type: Array,   default: null  },
        placeholder:  { type: String,  default: null  },
        vmodel:       { type: String,  default: null  },
        smodel:       { type: String,  default: null  },
        required:     { type: Boolean, default: false },
    },

    data() {
        let vparent = this.$parent
        if (this.vmodel){ vparent = Helpers.findParent(this.$parent, this.vmodel) }

        let model = this.localModel()

        return {
            vparent    : vparent,
            labelby    : this.localLabel(),
            trackby    : this.localTrack(),
            byholder   : this.placeholder ? this.placeholder : 'Select option',
            response   : model['response'],
            modelValue : model['value'],
        }
    },

    computed:{
        modelOptions(){
            let obj = []
            this.options.forEach((option)=>{
                obj.push({
                    id   : this.options.indexOf(option),
                    label: option,
                    value: option,
                })
            });
            return obj
        }
    },

    methods: {
        localLabel(){
            return 'label'
        },
        localTrack(){
            return 'id'
        },

        modelType(){
            console.log('this.smodel', this.smodel)
            console.log('this.vmodel', this.vmodel)
            return this.smodel !== null ? 'smodel' : 'vmodel'
        },

        optionsContainValues(){
            const keys = Object.keys(this.options)
            if (keys.length === 0) return false

            const firstObj = this.options[keys[0]]
            return firstObj.hasOwnProperty('value')
        },
        optionsContainIds(){
            const keys = Object.keys(this.options)
            if (keys.length === 0) return false

            const firstObj = this.options[keys[0]]
            return firstObj.hasOwnProperty('id')
        },

        localModel(){
            let vparent  = this.$parent
            let value    = 0

            switch (this.modelType()){
                case 'smodel':
                    value   = this.$store.getters['doodlegui/getSelectValue'](this.smodel)
                break;
                case 'vmodel':
                    vparent = Helpers.findParent(this.$parent, this.vmodel)
                    value   = Helpers.dotget(vparent, this.vmodel)
                break;
                default:
            }

            return {
                response: 'value',
                value: { id: this.options.indexOf(value), value: value, label: value }
            }

        },


        alter(value, id){

            // if an id or value was given in teh model, then give back an id or value
            let setvalue = (this.response !== 'object') ? value[this.response] : value

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
    },


}
</script>