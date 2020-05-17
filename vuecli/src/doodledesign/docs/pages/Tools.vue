<template>
	<div class="container">
		<div class="title bigger">Tools</div>
		<div class="title big">Components</div>

		<div class="title">Create the index</div>
		<div> When you've created a new component in the doodledesign folder you can add it to the components list. </div>
		<od-codeview>
			<pre>
			$> php tools/components.php
			</pre>
		</od-codeview>
		<div class="title">Create the iconfont</div>
		<div> When you've added an svg to the doodledesign font folder you can create a new font component. </div>
		<od-codeview>
			<pre>
			$> npx svgo -p 4 -q -f ./src/doodledesign/glyphs
			$> php tools/iconfont.php
			</pre>
		</od-codeview>
	</div>

</template>

<script>

export default {
	name: 'tools',
}
</script>
