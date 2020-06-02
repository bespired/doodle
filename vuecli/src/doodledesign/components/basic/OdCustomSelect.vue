<template>
    <div class="input-select-group" >
        <label :for="$options.namedId">
            {{ label }}
        </label>
        <multiselect
            v-bind="$props"
            v-on="$listeners"
            v-model="modelValue"
            :placeholder="byholder"
            :options="modelOptions"
            :allow-empty="false"
            :label="labelby"
            :track-by= "trackby"

        >
            <template slot="singleLabel" slot-scope="props">
                <span v-html="$store.state.doodlegui.multiselect(props.option, single)"></span>
            </template>
            <template slot="option" slot-scope="props">
                <span v-html="$store.state.doodlegui.multiselect(props.option, list)"></span>
            </template>
        </multiselect>
    </div>

</template>
<script>
import Helpers     from '../../helpers/helpers.js'
import Multiselect from "vue-multiselect"
import MultiselectMixin from "vue-multiselect/src/multiselectMixin"

export default {
    name: 'od-custom-select',

    components: {
        Multiselect
    },

    props: Object.assign(
        MultiselectMixin.props, {
            options:     {}, // Array, null or undefined...
            placeholder: { type: String,  default: null   },
            vmodel:      { type: String,  default: null   },
            smodel:      { type: String,  default: null   },
            soptions:    { type: String,  default: null   },
            label:       { type: String,  default: null   },
            required:    { type: Boolean, default: false  },
            single:      { type: String,  default: null   },
            list:        { type: String,  default: null   },
        }
    ),
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

    computed: {
        modelOptions(){
            if (this.soptions)
                return this.$store.getters['doodlegui/getSelectOptions'](this.soptions)
            if ( this.options === undefined ) return []
            return this.options
        },
        modelValue: {
            get() {
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