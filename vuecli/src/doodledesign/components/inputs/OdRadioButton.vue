/* eslint-disable no-alert, no-console */
<template>
    <button :id="$options.namedId" class="button radio-button" :class="isPressed()" @click.stop.self="clicked($event)">
        <slot />
        <od-iconpath :name="iconnames[isPressed()]" v-if="icon" />
    </button>
</template>
<script>
export default {
    name: 'od-radiobutton',
    props: {
        icons:    { type: String,  default: null },
        vmodel:   { type: String,  default: null },
        smodel:   { type: String,  default: null },
        value:    { type: String,  default: null },
    },

    data() {
        let radioState = this.vmodel ? this.$parent[this.vmodel] : false
        if (this.smodel) radioState = this.$store.getters['doodlegui/getRadioState'](this.smodel)

        return {
            radioState: radioState,
            local: '',
            icon: this.icons ? true : false,
            iconnames: this.iconsplit()
        }
    },

    computed: {
        changed() {
            if (this.vmodel) return this.$parent[this.vmodel]
            if (this.smodel) return this.$store.getters['doodlegui/getRadioState'](this.smodel)
            return this.radioState
        }
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
        iconsplit() {
            if (!this.icons) return []
            return {
                '': this.icons.split(',')[0],
                'pressed': this.icons.split(',')[1]
            }
        },
        clicked(event) {

            // todo: if no value given, use option as value
            this.radioState = this.value

            if (this.vmodel !== null) {
                this.$parent[this.vmodel] = this.radioState
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