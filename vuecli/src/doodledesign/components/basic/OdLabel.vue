<template>
    <div class="od-label" :class="type">
        {{ text }}
    </div>
</template>
<script>
export default {
    name: 'od-label',
    props: {
        type: String
    },
    data(){
    	const slotText = this.$slots.default ? this.$slots.default[0].text : ''
    	return {
    		text: slotText.replace('_', ' ')
    	}
    }
};
</script>