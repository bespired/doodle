<template>
    <VueShowdown :markdown="markdown" tag="span" class="markdown"/>
</template>
<script>
export default {
    name: 'od-markdown',
    props: {
        markdown: String
    },
    components:{
		VueShowdown: window.VueShowdown.VueShowdown
	},

};
</script>

