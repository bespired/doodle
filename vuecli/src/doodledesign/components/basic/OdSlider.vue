/* eslint-disable no-alert, no-console */
<template>
    <div class="input-group">
        <label :for="$options.namedId" >
            {{ label }}
        </label>
        <div class="input-row input-slider" :class="{ numberless }">
            <input
                type="range"
                :min="min"
                :max="max"
                :step="step"
                :id="$options.namedId"
                v-model="modelValue"
            >
            <span v-if="!numberless" :class="{ units }">{{ modelValue  }}{{ units }}</span>
        </div>
    </div>

</template>
<script>
import Helpers from '../../helpers/helpers.js'
import Vue     from 'vue'

export default {
    name: 'od-slider',
    props: {
        min:        { type: Number,  default: 0     },
        max:        { type: Number,  default: 100   },
        step:       { type: Number,  default: 1     },
        initial:    { type: Number,  default: null  },
        smodel:     { type: String,  default: null  },
        vmodel:     { type: String,  default: null  },
        label:      { type: String,  default: null  },
        units:      { type: String,  default: null  },
        numberless: { type: Boolean, default: false },
    },

    data() {
        if (this.smodel) {
            let initial = this.$store.getters['doodlegui/getTextValue'](this.smodel)
            if (initial === null) this.modelValue= (this.max - this.min) / 2 + this.min
        }
        return {
            vparent: this.$parent,
        }
    },

    computed: {
        modelValue: {
            get() {
                if (this.vmodel) return Helpers.dotget(this.vparent, this.vmodel)
                if (this.smodel) return this.$store.getters['doodlegui/getTextValue'](this.smodel)
                return this.value
            },
            set(value) {
                if (this.vmodel !== null) {
                    Helpers.dotset(this.vparent, this.vmodel, value)
                    return
                }
                if (this.smodel !== null) {
                    this.$store.commit('doodlegui/setTextValue', {
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