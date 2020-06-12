/* eslint-disable no-alert, no-console */
<template>
    <button :id="$options.namedId" class="button" :class="isPressed()" @click.self="clicked($event)">
        <slot />
        <od-iconpath :name="iconnames[isPressed()]" v-if="icon" />
    </button>
</template>
<script>
export default {
    name: 'od-button',
    props: {
        function: { type: String, default: null },
        icons:    { type: String, default: null },
        commit:   { type: String, default: null },
        vmodel:   { type: String, default: null },
        smodel:   { type: String, default: null },
        value:    { type: String, default: null },
    },
    data() {
        let valueState = this.vmodel ? this.$parent[this.vmodel] : false
        if (this.smodel) {
            if (this.function === 'radio') {
                valueState = this.$store.getters['doodlegui/getRadioState'](this.smodel)
            }else{
                valueState = this.$store.getters['doodlegui/getToggleState'](this.smodel)
            }
        }

        return {
            valueState: valueState,
            local: '',
            icon: this.icons ? true : false,
            iconnames: this.iconsplit()
        }
    },

    computed: {
        changed() {
            if (this.vmodel) return this.$parent[this.vmodel]
            if (this.smodel){
                if (this.function === 'radio') {
                    return this.$store.getters['doodlegui/getRadioState'](this.smodel)
                }else{
                    return this.$store.getters['doodlegui/getToggleState'](this.smodel)
                }
            }
            return this.valueState
        }
    },

    watch: {
        changed(val) {
            this.valueState = val
        }
    },

    methods: {
        iconsplit() {
            if (!this.icons) return []
            const icons= this.icons.split(',')
            return {
                '': icons[0],
                'pressed': icons[1] ? icons[1] : icons[0]
            }
        },
        isPressed() {
            if (this.function === 'radio')
                return this.valueState === this.value ? 'pressed' : ''

            return this.valueState ? 'pressed' : ''
        },

        clicked(event) {

            if (this.function === 'radio') {
                if (this.valueState === this.value){
                    this.valueState = null
                }else{
                    this.valueState = this.value
                }

                if (this.vmodel !== null) {
                    this.$parent[this.vmodel] = this.valueState
                    return
                }
                if (this.smodel !== null) {
                    this.$store.commit('doodlegui/setRadioState', {
                        key:   this.smodel,
                        value: this.valueState,
                    })
                    return
                }

                this.$emit('click', this.valueState)
                return
            }

            if (this.function === 'toggle') {
                this.valueState = !this.valueState
                if (this.vmodel !== null) {
                    this.$parent[this.vmodel] = this.valueState
                    return
                }
                if (this.smodel !== null) {
                    this.$store.commit('doodlegui/setToggleState', {
                        key:   this.smodel,
                        value: this.valueState,
                    })
                    return
                }

                this.$emit('click', this.valueState)
                return
            }

            if (this.vmodel !== null) {
                this.$emit('click', this.valueState)
                return
            }

            if (this.commit === null) {
                this.$emit('click', event)
                return
            }

            let action   = this.commit.split(':')[0]
            let argument = this.commit.split(':')[1]

            this.$store.dispatch(action, argument)
        }


    }
}
</script>