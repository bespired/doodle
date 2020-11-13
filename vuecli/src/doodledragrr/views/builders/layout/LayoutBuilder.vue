<template>
	<section class="od-device-look" :key="`${media}-${update}`" v-if="layoutTemplate">

		<div class="od-browser-look" v-if="media === 'xlarge'">
			<div class="dot"></div><div class="dot"></div><div class="dot"></div>
			<div class="od-url-area"><div class="od-url-bar">
				http://url
			</div></div>
			<layout-svg :layout="layoutTemplate" :media="media" />
		</div>

		<div class="od-browser-look" v-if="media === 'desktop'">
			<div class="dot"></div><div class="dot"></div><div class="dot"></div>
			<div class="od-url-area"><div class="od-url-bar">
				http://url
			</div></div>
			<layout-svg :layout="layoutTemplate" :media="media" />
		</div>

		<div class="od-tablet-look" v-if="media === 'tablet'">
			<div class="od-battery-area">
				<span class="clock">{{ date }}</span>
				<span class="battery">100% <od-iconpath name="battery-full"/></span>
			</div>
			<div class="od-url-area"><div class="od-url-bar">
				http://url
			</div></div>
			<layout-svg :layout="layoutTemplate" :media="media" />
		</div>

		<div class="od-mobile-look" v-if="media === 'mobile'">
			<div class="od-glass-look">
				<div class="od-battery-area">
					<span class="clock">{{ time }}</span>
					<span class="iphoneX"></span>
					<span class="battery">100% <od-iconpath name="battery-full"/></span>
				</div>
				<div class="od-url-area"><div class="od-url-bar">
					http://url
				</div></div>
				<layout-svg :layout="layoutTemplate" :media="media" />
			</div>
		</div>

	</section>
</template>

<script>
import Vue from 'vue';
import LayoutSvg from '@/doodledragrr/components/LayoutSvg'

export default {
	name: 'layout-builder',

	components: {
		LayoutSvg,
	},

	data(){
		let dt = new Date()
		return {
			date:   this.today(),
			time:   this.clock(),
			update: 0,
		}
	},

	computed: {
		layoutTemplate(){
			return this.$store.getters['dragrr/currentTemplate']
		},

		media(){
			this.date= this.today()
			this.time= this.clock()
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
		}
	},

	watch: {
		layoutTemplate: {
			deep: true,
			handler(){
				this.update++;
			}
		}
	},

	methods:{
		clock(){
			let dt = new Date()
			return `${dt.getHours()}:${dt.getMinutes()>9?'':'0'}${dt.getMinutes()}`
		},
		today(){
			const months= ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
			let dt = new Date()
			let time = `${dt.getHours()}:${dt.getMinutes()>9?'':'0'}${dt.getMinutes()}`
			let date = `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`
			return `${time} ${date}`

		}
	}
}
</script>
