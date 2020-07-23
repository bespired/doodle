/* eslint-disable no-alert, no-console */
<template>
    <div class="od-radiobox" :class="[isPressed(), isDisabled]" @click="clicked($event)">
        <div class="od-radiobox-container">
            <div class="od-radiobox-thumb" />
        </div>
        <label class="od-radiobox-label">
            <slot />
        </label>
    </div>
</template>
<script>
export default {
    name: 'od-radiobox',

    props: {
        commit:   { type: String,  default: null },
        vmodel:   { type: String,  default: null },
        smodel:   { type: String,  default: null },
        value:    { type: String,  default: null },
        disabled: { type: Boolean, default: null },
    },

    data() {
        let vparent = this.$parent.$options._componentTag === "od-radiorow" ? this.$parent.$parent : this.$parent
        let radioState = this.vmodel ? vparent[this.vmodel] : false
        if (this.smodel) radioState = this.$store.getters['doodlegui/getRadioState'](this.smodel)

        console.log( vparent )

        return {
            vparent: vparent,
            radioState: radioState,
        }
    },

    computed: {
        changed() {
            if (this.vmodel) return this.vparent[this.vmodel]
            if (this.smodel) return this.$store.getters['doodlegui/getRadioState'](this.smodel)
            return this.radioState
        },
        isDisabled() {
            return this.disabled ? 'disabled' : ''
        },
    },

    watch: {
        changed(val) {
            this.radioState = val
        }
    },

    methods: {

        isPressed() {
            return this.radioState === this.value ? 'pressed' : ''
        },

        clicked($eventevent) {

            if (this.disabled) return
            if ((this.$parent.$options.propsData) && (this.$parent.$options.propsData.disabled)) return

            // todo: if no value given, use option as value
            this.radioState = this.value

            if (this.vmodel !== null) {
                this.vparent[this.vmodel] = this.radioState
                return
            }

            if (this.smodel !== null) {
                this.$store.commit('doodlegui/setRadioState', {
                    key: this.smodel,
                    value: this.radioState,
                })
                return
            }

            this.$emit('click', this.radioState)

        }

    }
}
</script>