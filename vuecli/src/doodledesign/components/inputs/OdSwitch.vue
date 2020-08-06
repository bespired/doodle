/* eslint-disable no-alert, no-console */
<template>
    <div class="od-switch" :class="isPressed()" @click="clicked()">
        <div class="od-switch-container">
            <div class="od-switch-thumb" />
        </div>
        <label class="od-switch-label">
            <slot />
        </label>
    </div>
</template>
<script>
import Helpers from '../../helpers/helpers.js'
export default {
    name: 'od-switch',
    props: {
        commit: { type: String, default: null },
        vmodel: { type: String, default: null },
        smodel: { type: String, default: null },
    },
    data() {
        let vparent = this.$parent
        if (this.vmodel){ vparent = Helpers.findParent(this.$parent, this.vmodel) }

        let toggleState = this.vmodel ? Helpers.dotget(vparent, this.vmodel) : false
        if (this.smodel) toggleState = this.$store.getters['doodlegui/getToggleState'](this.smodel)

        return {
            vparent    : vparent,
            toggleState: toggleState,
        }
    },

    computed: {
        changed() {
            if (this.vmodel) return Helpers.dotget(this.vparent, this.vmodel)
            if (this.smodel) return this.$store.getters['doodlegui/getToggleState'](this.smodel)
            return this.toggleState
        }
    },

    watch: {
        changed(val) {
            this.toggleState = val
        }
    },

    methods: {
        isPressed() {
            return this.toggleState ? 'pressed' : ''
        },

        clicked(event) {

            this.toggleState = !this.toggleState

            if (this.vmodel !== null) {
                Helpers.dotset(this.vparent, this.vmodel, this.toggleState)
                this.$emit('changed', this.toggleState)
                return
            }

            if (this.smodel !== null) {
                this.$store.commit('doodlegui/setToggleState', {
                    key: this.smodel,
                    value: this.toggleState,
                })
                this.$emit('changed', this.toggleState)
                return
            }

            this.$emit('click', this.toggleState)

        }

    }
}
</script>