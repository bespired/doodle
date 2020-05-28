<template>
	<div class="container">
		<div class="title bigger">Basic Elements</div>
		<div class="title big">Inputs</div>

		<div class="title">Select</div>
		<div class="flex-80">
			<od-select label="VueModel options" vmodel="selected" :options="options" />
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-select vmodel="selected" :options="options" /*)
			</pre>
		</od-codeview>

		<div class="flex-80">
			<od-options sname="store-options" :options="options" />
			<od-select label="StoreModel select, model options" smodel="selected" :options="options" />
			<od-select label="StoreModel select, store options" smodel="selected" soptions="store-options" />
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-select smodel="options" :options="options" /*)
				(*od-select smodel="options" soptions="store-options" /*)
				// you'll need to create some first...
				(*od-options sname="store-options" :options="options" /*)
			</pre>
		</od-codeview>

		<div class="flex-80">
			<od-select label="Tags" vmodel="tagselected" :options="tagoptions" tags />
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-select smodel="options" /*)
			</pre>
		</od-codeview>

		<!-- <div class="flex-80">

			<od-select-template name="layout">
				<span class="option__title"></span>
        	</od-select-template>

			<od-select label="custom template options" vmodel="custom" custom="layout" />

		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-select smodel="options" /*)
			</pre>
		</od-codeview> -->


	</div>
</template>

<script>

export default {
	name: 'dropdowns',
	data(){
		return {
			selected: 1, // well no, should be { label: 'label 1', value: '1' , id: 1 },
			options:[
				{ label: 'label 1', value: '1' , id: 1 },
				{ label: 'label 2', value: '2' , id: 2 }
			],

			tagselected: [
				{ label: 'tag 1', value: 'tag_1' , id: 1 }
			],
			tagoptions:[
				{ label: 'tag 1', value: 'tag_1' , id: 1 },
				{ label: 'tag 2', value: 'tag_2' , id: 2 }
			],
		}
	},
}
</script>
