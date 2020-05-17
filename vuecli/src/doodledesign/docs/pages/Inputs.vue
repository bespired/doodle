<template>
	<div class="container">
		<div class="title bigger">Basic Elements</div>
		<div class="title big">Inputs</div>

		<div class="title">Text</div>
		<div class="flex-80">
			<od-text-input vmodel="textVar" label="placeholder label"/>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-text-input vmodel="textVar" label="placeholder label"/*)
			</pre>
		</od-codeview>
		<div class="flex-80">
			<od-text-input vmodel="textVar" prefix="email" label="with prefix"/>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-text-input vmodel="textVar" prefix="email" label="with prefix" /*>
			</pre>
		</od-codeview>
		<div class="flex-80">
			<od-text-input vmodel="textVar" postfix="pick" action="pick" :clear="true" label="with postfix and clear"/>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-text-input vmodel="textVar" postfix="pick" action="pick" :clear="true" label="with postfix and clear" /*)
			</pre>
		</od-codeview>

	</div>
</template>

<script>

export default {
	name: 'inputs',
	data(){
		return {
			textVar: null,
		}
	},
}
</script>
