<template>
    <div class="input-group" :class="prefixer()">
        <label :for="$options.namedId" :class="{ placeholder:placeholder }">
            {{ label }}
        </label>
        <div class="input-row">
            <span :ref="$options.namedId" v-if="prefix!==null">{{ prefix }}</span>
            <input :id="$options.namedId" :required="isRequired" :autocomplete="isAutocomplete" :type="type" v-model="modelValue" @focus="focusLabel(true)" @blur="focusLabel(false)" />
            <span @click="doAction()" v-if="postfix!==null" :class="{'input-button':action}">{{ postfix }}</span>
            <span @click="doClear()"  v-if="clear" class="input-button">×</span>
        </div>
    </div>
</template>
<script>
import Helpers from '../../helpers/helpers.js'

export default {
    name: 'od-text-input',
    props: {
        commit:       { type: String,  default: null  },
        vmodel:       { type: String,  default: null  },
        smodel:       { type: String,  default: null  },
        value:        { type: String,  default: null  },
        label:        { type: String,  default: null  },
        required:     { type: Boolean, default: false },
        autocomplete: { type: String,  default: null  },
        type:         { type: String,  default: 'text'},

        prefix:       { type: String,  default: null  },
        minWidth:     { type: String,  default: null  },
        postfix:      { type: String,  default: null  },
        action:       { type: String,  default: null  },
        clear:        { type: Boolean, default: false },
    },

    data() {
        return {
            // autocomplete: 'off',
            focus:          false,
            isAutocomplete: this.autocomplete ? this.autocomplete : this.$options.namedId,
            isRequired:     this.required ? 'required' : false,
            vparent:        this.$parent,
            placeholder:    this.initialLabel(),
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

    watch: {
        modelValue(value) {
            this.focusLabel()
        }
    },

    methods: {
        doAction() {},
        doClear() {},
        prefixer() {
            let classes = []
            let prefixer = this.prefix  === null ? 0 : this.prefix.length
            let prefixLength = Math.max(this.minWidth, Math.ceil(prefixer / 3))
            classes.push(this.prefix  === null ? '' : 'prefix')
            classes.push(this.postfix === null ? '' : 'postfix')
            classes.push(this.clear   === null ? '' : 'clear')
            classes.push(this.prefix  === null ? '' : 'prefix-' + prefixLength)
            return classes.join(' ')
        },

        focusLabel(focus) {
            if (focus !== undefined) this.focus = focus
            this.placeholder = false;
            if (this.modelValue === null) this.placeholder = true;
            if ((this.modelValue !== null) && (this.modelValue.length === 0)) this.placeholder = true;
            if (this.focus) this.placeholder = false;
        },
        initialLabel() {
            if (this.vmodel) return Helpers.dotget(this.$parent, this.vmodel) === null || Helpers.dotget(this.vparent, this.vmodel).length === 0
            if (this.smodel) return this.$store.getters['doodlegui/getTextValue'](this.smodel).length === 0
            return this.value.length === 0
        },
    }
}
</script>