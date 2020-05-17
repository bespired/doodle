<template>
	<div class="container">
		<div class="title bigger">Panels</div>
		<div class="title big">Panel</div>

		<div class="title">Action Panel</div>
		<div class="flex-80">
			<action-panel :list="[{panel:'Wipe project', label:'Wipe', route:'panels'}, {panel:'Clone project', label:'Clone', route:'panels'}]" />
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-action-panel :list="[{panel:'Wipe project', label:'Wipe', route:'wipe'}, {panel:'Clone project', label:'Clone', route:'clone'}]" /*)
			</pre>
		</od-codeview>
	</div>

</template>

<script>

export default {
	name: 'tools',
	// data(){
	// 	return {
	// 		connections: { label_1: true, label_2: false }
	// 	}
	// }
}
</script>
<style>
	.flex-80 .capitalize-words{ margin-right: 40px; }
</style>
