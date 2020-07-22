/* eslint-disable no-alert, no-console */
<template>
    <div class="input-group" :class="prefixer()">
        <label :for="$options.namedId" v-if="label">
            {{ label }}
        </label>
        <div class="input-row input-slider" :class="{ numberless }">
            <span class="prefix" v-if="prefix!==null">{{ prefix }}</span>
            <input
                type="range"
                :min="min"
                :max="max"
                :step="step"
                :id="$options.namedId"
                v-model="modelValue"
            >
            <span v-if="!numberless" :class="{ units }">
                <input type="number" :min="min" :max="max" :step="step" v-model="modelValue" >
                <span>{{ units }}</span>
            </span>
            <!-- <span v-if="!numberless" :class="{ units }">{{ modelValue  }}{{ units }}</span> -->
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
        prefix:     { type: String,  default: null  },
        minWidth:   { type: String,  default: null  },

    },

    data() {
        if (this.smodel) {
            let initial = this.$store.getters['doodlegui/getTextValue'](this.smodel)
            if (initial === null) this.modelValue= (this.max - this.min) / 2 + this.min
        }
        // this is not how to do it ...
        var wrapper= this.$parent.$vnode.tag.indexOf('od-fold-body') > -1
        return {
            vparent: wrapper ? this.$parent.$parent.$parent : this.$parent,
        }
    },

    computed: {
        modelValue: {
            get() {
                if (this.vmodel) {
                    return Helpers.dotget(this.vparent, this.vmodel)
                }
                if (this.smodel) {
                    return this.$store.getters['doodlegui/getTextValue'](this.smodel)
                }
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

     methods: {
        prefixer() {
            let prefixer = this.prefix  === null ? 0 : this.prefix.length
            let prefixLength = Math.max(this.minWidth, Math.ceil(prefixer / 3))
            return this.prefix  === null ? '' : 'prefix prefix-' + prefixLength
        },
    }
}
</script>