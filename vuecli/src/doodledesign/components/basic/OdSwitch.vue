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
export default {
    name: 'od-switch',
    props: {
        commit: { type: String, default: null },
        vmodel: { type: String, default: null },
        smodel: { type: String, default: null },
    },
    data() {
        let toggleState = this.vmodel ? this.$parent[this.vmodel] : false
        if (this.smodel) toggleState = this.$store.getters['doodlegui/getToggleState'](this.smodel)

        return {
            toggleState: toggleState,
        }
    },

    computed: {
        changed() {
            if (this.vmodel) return this.$parent[this.vmodel]
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
                this.$parent[this.vmodel] = this.toggleState
                return
            }

            if (this.smodel !== null) {
                this.$store.commit('doodlegui/setToggleState', {
                    key: this.smodel,
                    value: this.toggleState,
                })
                return
            }

            this.$emit('click', this.toggleState)

        }

    }
}
</script>