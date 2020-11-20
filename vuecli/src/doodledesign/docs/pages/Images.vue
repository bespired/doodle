<template>
	<div class="container">
		<div class="title bigger">Basic Elements</div>
		<div class="title big">Images</div>

		<div class="title">Upload</div>
		<div class="flex-80">
			<od-image-input vmodel="textVar" label="label"/>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-image-input vmodel="textVar" label="placeholder label"/*)
			</pre>
		</od-codeview>

	</div>
</template>

<script>

export default {
	name: 'inputs',
	data(){
		return {
			textVar: '',
			textInsetVar: 'smaller',
			sliderVal: 50,
		}
	},
}
</script>
