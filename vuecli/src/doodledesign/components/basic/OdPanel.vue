<template>
    <div class="od-panel-frame" :class="type">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'od-panel',
    props: {
        markdown: String
    },
    components:{
		VueShowdown: window.VueShowdown.VueShowdown
	},

};
</script>

