<template>
	<section class="dd-size-look widgets" :class="media" v-if="widgetTemplate">
		<section v-html="cssFile()"/>
		<template v-for="(row, idx) in widgetTemplate.rows">
			<div class="row" :key="`row-${idx}`">
				<template v-for="(space, inx) in row.spaces">
					<div class="column"
						:class="respconv(row, space)"
						:key="`row-${idx}-column-${inx}`">
						<div>{{ space.widget }}</div>
						<div class="contentType" :class="space.content">{{ space.content }}</div>
					</div>
				</template>
			</div>
		</template>
	</section>
</template>

<style>
</style>

<script>
import Vue from 'vue';
export default {
	name: 'section-builder',

	beforeMount() {
	},
	destroyed() {
	},

	data(){
		return {
		}
	},

	computed: {
  		widgetTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},
		media(){
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		}
	},

	methods: {
	}


}
</script>