<template>
	<div class="container">
		<div class="title bigger">Lists</div>
		<div class="title big">List</div>

		<div class="title">Status List</div>
		<div class="flex-80">
			<od-status-list :list="{ label_1: true, label_2: false }" />
			<od-status-list
				label="label" status="value"
				:list="[ { label: 'label_1', value: true }, { label: 'label_2', value: false } ]" />
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-status-list :list="{ label_1: true, label_2: false }" /*)
				(*od-status-list label="label" status="value" :list="[ { label: 'label_1', value: true }, { label: 'label_2', value: false } ]" /*)
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
