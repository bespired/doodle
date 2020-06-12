<template>
	<div class="container">
		<div class="title bigger">Wrappers</div>
		<div class="title big">Accordion</div>

		<od-foldable >
			<od-fold-header label="Folding" />
			<od-fold-body >
				&nbsp;<br>&nbsp;
			</od-fold-body>
			<od-fold-header label="Folding" />
			<od-fold-body >
				&nbsp;<br>&nbsp;
			</od-fold-body>
		</od-foldable>

		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-foldable *)
					(*od-fold-header label="Folding" /*)
					(*od-fold-body *)
						Body Content
					(*/od-fold-body*)
					(*od-fold-header label="Folding" /*)
					(*od-fold-body *)
						Body Content
					(*/od-fold-body*)
				(*/od-foldable*)
			</pre>
		</od-codeview>
	</div>
</template>

<script>

export default {
	name: 'accordion',
	data(){
		return {
		}
	},

	computed:{
	},

	methods:{
	}

}
</script>
