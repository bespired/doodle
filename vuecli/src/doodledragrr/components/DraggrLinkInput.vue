<template>
    <div class="input-group">
        <label :for="$options.namedId" >
            {{ label }}
        </label>
        <div class="link-border">
            <od-text-input :vmodel="`${owner}.label`"  label="label"  :inset="true" />
            <od-text-input :vmodel="`${owner}.url`"    label="url"    :inset="true" />
            <od-text-input :vmodel="`${owner}.targer`" label="target" :inset="true" />
            <od-text-input :vmodel="`${owner}.icon`"   label="icon"   :inset="true" />
        </div>
    </div>
</template>


<style lang="scss">
.link-border{
    border: 1px dashed var(--color-border);
    padding:1em 8px;
}
</style>

<script>

import Vue from 'vue'

export default {

    name: 'dragrr-link-input',

    props: {
        owner:        { type: String,  default: null },
        vmodel:       { type: String,  default: null },
        smodel:       { type: String,  default: null },
        label:        { type: String,  default: null },
    },

    data() {
        return {
        };
    },


    computed: {

    },

    methods: {

    },
};

</script>