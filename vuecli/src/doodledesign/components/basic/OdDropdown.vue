/* eslint-disable no-alert, no-console */
<template>
    <div class="dropdown" v-out="dropdownState">
        <a href="#" class="button dropdown--toggle"
            :id="$options.namedId"
            :class="[{open:dropdownState}, theme]"
            @click.self="clicked($event)">
            <span class="sub-title" v-if="sublabel">{{ sublabel }}</span>
            {{ label }}
        </a>
        <div class="dropdown--menu" :class="[{open:dropdownState}, theme]">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'od-dropdown',
    props: {
        label:    { type: String, default: null },
        sublabel: { type: String, default: null },
    },
    data() {
        return {
            dropdownState: false,
            theme: this.$vnode.data.staticClass,
        }
    },
    methods: {
        isPressed() {
            return this.dropdownState === this.id ? 'pressed' : ''
        },
        clicked(event) {
            this.dropdownState = !this.dropdownState
        },

    },

}
</script>