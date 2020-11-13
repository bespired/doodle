<template>
	<section v-if="pageTemplate">
		<!-- <od-text-input vmodel="pageTemplate.label" label="label"/> -->
		<!-- {{ contentStub }} -->
		<content-filler :dson="dson" :schema="schema" v-if="dson && schema" />
	</section>
</template>

<script>
import Vue from 'vue';
import ContentFiller from '@/doodledragrr/components/ContentFiller'

export default {
	name: 'page-content-properties',

	components: {
		ContentFiller,
	},

	created() {
		this.$eventHub.$on('save',  this.save );
		this.$eventHub.$on('index', this.index );
		window.addEventListener("message", (event) => { this.iframeMessage(event) }, false)
	},

	beforeDestroy() {
		this.$eventHub.$off('save');
		this.$eventHub.$off('index');
		window.removeEventListener("message", (event) => { this.iframeMessage(event) }, false)
	},

	data(){
		return {
			contentStub: null
		}
	},

	computed: {
		pageTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},

		media(){
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		},

		dson(){
			return this.$store.getters['dragrr/getDsonStub']
		},
		schema(){
			return this.$store.getters['dragrr/getDsonSchema']
		},
	},

	methods:{
		iframeMessage(event) {
			// console.log(event.data)

			if (event.data === undefined) return
			if (event.data.type === undefined) return
			if (event.data.stub === undefined) return

			if (event.data.type !== 'stub click') return

			this.contentStub = event.data.stub
		 	this.$store.dispatch('dragrr/loadDson', {
		 		language: 'en',
		 		name: this.contentStub
		 	})

		},
		index(){
			this.$router.push('/page-contents')
		},
		save(){
			// this.$store.dispatch('dragrr/saveCurrentTemplate', { source: 'page' })
		},

	}
}
</script>