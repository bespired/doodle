<template>

    <multiselect v-bind="$props" v-on="$listeners">
        <template slot="singleLabel" slot-scope="props">
            <span v-html="$store.state.doodlegui.multiselect(props.option, single)"></span>
        </template>
        <template slot="option" slot-scope="props">
            <span v-html="$store.state.doodlegui.multiselect(props.option, list)"></span>
        </template>
    </multiselect>

</template>
<script>
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
            placeholder: { type: String, default: null   },
            vmodel:      { type: String, default: null   },
            smodel:      { type: String, default: null   },
            soptions:    { type: String, default: null   },
            label:       { type: String, default: null   },
            required:    { type: Boolean, default: false },
            single:      { type: String, default: null   },
            list:        { type: String, default: null   },
        }
    ),

}
</script>