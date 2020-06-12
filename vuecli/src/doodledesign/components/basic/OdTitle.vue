<template>
    <div class="title" :class="type">
        {{ text }}
    </div>
</template>
<script>
export default {
    name: 'od-title',
    props: {
        type: { type: String, default: 'big' },
    },
    data(){
    	const slotText = this.$slots.default ? this.$slots.default[0].text : ''
    	return {
    		text: slotText.replace('_', ' ')
    	}
    }
};
</script>