<template>
	<section class="full-height">
		<od-split-window sizes="large,smaller" types="index,action">
			<template #title        >Index</template>
			<template #subtitle     >{{ index }}</template>
			<template #leftMenu     ><od-header-search /></template>
			<template #rightMenu    >&nbsp;</template>
			<template #leftContent  ><od-thumbs :thumbs="thumbs" :route="route" /></template>
			<template #rightContent >NEW</template>
		</od-split-window>
	</section>
</template>

<script>

export default {
	name: 'index',

	props: ['index'],

	data(){
		return {
			route: document.location.pathname.replace('/admin','')
		}
	},

	mounted() {
		let indexer = this.camelcase(this.index)
		this.$store.dispatch(`index/get${indexer}`)
	},

	computed: {
		thumbs() {
			let indexer = this.camelcase(this.index)
			return this.$store.getters[`index/get${indexer}`]
		}
	},

	methods:{
		camelcase(str) {
			return str.split('-').map(function(word,index){
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		  }).join('');
		}
	}

}
</script>
