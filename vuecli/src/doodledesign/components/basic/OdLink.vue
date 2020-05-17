/* eslint-disable no-alert, no-console */
<template>
    <a :id="$options.namedId" class="button" :class="isPressed()" :href="link()">
        <slot />
        <od-iconpath :name="iconnames[isPressed()]" v-if="icon" />
    </a>
</template>
<script>
export default {
    name: 'od-link',
    props: {
        icons:    { type: String, default: null },
        route:    { type: String, default: null },
        path:     { type: String, default: null },
    },
    data() {

        return {
            icon: this.icons ? true : false,
            iconnames: this.iconsplit(),
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
        link(){
            if ( this.route ){
                let props = this.$router.resolve({
                    name: this.route,
                });
                return props.href;
            }
            if ( this.path ){
                if ( this.path.substr(0,4) === 'http' ){
                    return this.path
                }

                if ( this.path.substr(0,2) === '//' ){
                    return `${window.location.protocol}//${window.location.host}${this.path.substr(1,this.path.length)}`
                }

                let path  = this.path.substr(0,1) === '/' ? this.path.substr(1, this.path.length) : this.path
                let props = this.$router.resolve({ path: '/' });
                return props.href + path;
            }

        },
    }
}
</script>