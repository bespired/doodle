<template>
		<table class="od-tag-listing">
			<tr v-for="(table, name) in list" :key="name">
				<td class="od-tag-listing-label" > {{ name }}  </td>
				<td class="od-tag-listing-tags">
					<od-badge v-for="(column,index) in table" :key="`${name}-${index}`" >{{ column }}</od-badge>
				</td>
			</tr>
		</table>
</template>

<script>

export default {
	name: 'od-tag-listing',
	props: ['list'],
}
</script>