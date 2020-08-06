/* eslint-disable no-alert, no-console */
<template>
    <div :id="$options.namedId" class="od-checkbox" :class="isPressed()" @click="clicked()">
        <div class="od-checkbox-container">
            <svg class="od-checkbox-thumb" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
                <path d="M945 311q0 22-16 38L449 829q-16 15-38 15t-38-15L95 551q-15-16-15-38t15-38l76-76q16-16 38-16t38 16l164 165 366-367q16-16 38-16t38 16l76 76q16 15 16 38z" fill="currentColor"></path>
            </svg>
        </div>
        <label class="od-checkbox-label">
            <slot />
        </label>
    </div>
</template>
<script>
export default {
    name: 'od-checkbox',
    props: {
        commit: { type: String, default: null },
        vmodel: { type: String, default: null },
        smodel: { type: String, default: null },
    },
    data() {
        let vparent = this.$parent
        if (this.vmodel){ vparent = Helpers.findParent(this.$parent, this.vmodel) }

        let toggleState = this.vmodel ? vparent[this.vmodel] : false
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