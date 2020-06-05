<template>
    <div></div>
</template>

<script>
export default {
    name: 'od-custom-function',

    props: Object.assign(
        {
            funcName:    { type: String,    default: null  },
            callback:    { type: Function,  default: null  },
        }
    ),

    created(){
        this.$store.commit('doodlegui/setCustomFunction', {
            key:   this.funcName,
            value: this.callback,
        })
    },

}
</script>