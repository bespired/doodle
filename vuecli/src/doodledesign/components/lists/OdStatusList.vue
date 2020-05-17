<template>
	<div>
		<ul class="box-frame" v-if="list && displaytype === 'boolean'">
			<template v-for="(item, index) in list">
				<li class="box-header" :key="index">
					<od-label class="capitalize-words">{{ index }}</od-label>
					<od-badge :class="type(item)" class="round right-align">{{ item }}</od-badge>
				</li>
			</template>
		</ul>
		<ul class="box-frame" v-if="list && displaytype === 'object'">
			<template v-for="(item, index) in list">
				<li class="box-header" :key="index" v-if="!show || helpers.dotget(item, show)">
					<od-label
						class="capitalize-words"
						v-html="helpers.dotget(item, label)"
					/>
					<od-badge
						:class="type(helpers.dotget(item, status))"
						 class="round right-align"
						 v-html="helpers.dotget(item, status)"
					/>
				</li>
			</template>
		</ul>
		<od-loading class="center" v-if="!list" />
	</div>
</template>

<script>

import Helpers from '../../helpers/helpers.js'

export default {
	name: 'od-status-list',
	props: [ 'list', 'show', 'label', 'status' ],
	data(){
		return {
			helpers:  Helpers
			// displaytype: this.list !== undefined && this.list !== null ? typeof Object.values( this.list )[0] : null
		}
	},
	computed: {
        displaytype() {
        	return this.list !== undefined && this.list !== null ? typeof Object.values( this.list )[0] : null
        }
    },
	methods:{
		type(bool){
			return bool ? 'success' : 'danger'
		}
	}
}
</script>