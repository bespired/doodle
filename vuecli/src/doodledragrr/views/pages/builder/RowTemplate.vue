<template>
	<section class="od-device-look" :key="size" >
		<div class="od-browser-look" v-if="size === 'desktop'">
			<div class="dot"></div><div class="dot"></div><div class="dot"></div>
			<div class="od-url-area"><div class="od-url-bar">
				http://url
			</div></div>
			<row-svg :data="data" size="desktop" />
		</div>

		<div class="od-tablet-look" v-if="size === 'tablet'">
			<div class="od-battery-area">
				<span class="clock">{{ date }}</span>
				<span class="battery">100% <od-iconpath name="battery-full"/></span>
			</div>
			<div class="od-url-area"><div class="od-url-bar">
				http://url
			</div></div>
			<row-svg :data="data" size="tablet" />
		</div>

		<div class="od-mobile-look" v-if="size === 'mobile'">
			<div class="od-glass-look">
				<div class="od-battery-area">
					<span class="clock">{{ time }}</span>
					<span class="iphoneX"></span>
					<span class="battery">100% <od-iconpath name="battery-full"/></span>
				</div>
				<div class="od-url-area"><div class="od-url-bar">
					http://url
				</div></div>
				<row-svg :data="data" size="mobile" />
			</div>
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import RowSvg from '@/components/RowSvg'

export default {
	name: 'row-template',

	components: {
		RowSvg,
	},

	mounted(){
		let size = this.$store.getters['doodlegui/getRadioState']('devicesize')
		if (!size) {
			this.$store.commit('doodlegui/setRadioState', {
                key:   'devicesize', value: 'desktop',
			})
		}
	},

	data(){
		let dt = new Date()
		return {
			date: this.today(),
			time: this.clock()
		}
	},

	computed: {
		data(){
			return {"responsive":12,"fillstyle":"max-width","mobile":{"maxWidth":0,"min":10,"max":640,"gutters":{"row":0,"column":10,"top":10,"bottom":10}},"tablet":{"maxWidth":0,"min":641,"max":1007,"gutters":{"row":10,"column":20,"top":30,"bottom":40}},"desktop":{"maxWidth":960,"min":1008,"max":1365,"gutters":{"row":30,"column":20,"top":30,"bottom":40}},"xlarge":{"maxWidth":1140,"min":1366,"max":9999,"gutters":{"row":30,"column":20,"top":30,"bottom":40}}}
		},

		size(){
			this.date= this.today()
			this.time= this.clock()
			return this.$store.getters['doodlegui/getRadioState']('devicesize')
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
