<template>
	<div class="container">
		<div class="title bigger">Basic Elements</div>
		<div class="title">Switch</div>
		<div class="flex-80">
			<od-switch vmodel="modelname"> model </od-switch>
			<od-switch smodel="storename"> store </od-switch>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-switch* vmodel="modelname") model (*/od-switch*)
				(*od-switch* smodel="storename") store (*/od-switch*)
			</pre>
		</od-codeview>
		<div class="title">Checkbox</div>
		<div class="flex-80">
			<od-checkbox vmodel="modelname" values="false,true"> model </od-checkbox>
			<od-checkbox smodel="storename" values="0,1"       > store </od-checkbox>
			<od-checkbox class="smaller"    smodel="storename" > smaller </od-checkbox>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-checkbox vmodel="modelname" values="false,true"*) model   (*/od-checkbox*)
				(*od-checkbox smodel="storename" values="0,1"       *) store   (*/od-checkbox*)
				(*od-checkbox class="smaller"    smodel="storename" *) smaller (*/od-checkbox*)
			</pre>
		</od-codeview>
		<div class="title">Radio row {{ storename }}</div>
		<div class="flex-80">
			<od-radiorow :disabled="storename">
				<od-radiobox vmodel="radioname" value="option1" > option 1 </od-radiobox>
				<od-radiobox vmodel="radioname" value="option2" > option 2 </od-radiobox>
				<od-radiobox vmodel="radioname" value="option3" :disabled="modelname" > option 3 </od-radiobox>
				<od-radiobox vmodel="radioname" value="option4" class="smaller" > smaller </od-radiobox>
			</od-radiorow>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
			(*od-radiorow :disabled="storename"*)
				(*od-radiobox vmodel="radioname" value="option1" *) option 1 (*/od-radiobox*)
				(*od-radiobox vmodel="radioname" value="option2" *) option 2 (*/od-radiobox*)
				(*od-radiobox vmodel="radioname" value="option3" :disabled="modelname" *) option 3 (*/od-radiobox*)
				(*od-radiobox vmodel="radioname" value="option4" class="smaller" *) smaller (*/od-radiobox*)
			(*/od-radiorow*)
			</pre>
		</od-codeview>
	</div>

</template>

<script>

export default {
	name: 'switches',
	data(){
		return {
			toggleVar: false,
			modelname: false,
			radioname: 'option2',
			textVar  : null,
		}
	},
	computed:{
		storename(){
			return this.$store.getters['doodlegui/getToggleState']('storename')
		}
	},
}
</script>
