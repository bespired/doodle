<template>
	<div class="schemafiller">
		<!-- {{ dson.data }} -->
		<template v-for="(row, idx) in schema.data">
			<div class="row" :key="`row-${idx}`" :data-row="`${idx}`">
				<template v-for="(column, jdx) in row">
					<div :class="`column width-${column.width}`"
						 :key="`${idx}-${jdx}`"
						 :data-column="`${idx}-${jdx}`">
						 <div>
						 	<od-text-input :vmodel="`dson.data.${column.attrib}`" :label="column.label"/>
						 </div>
					</div>
				</template>
			</div>
		</template>
	</div>
</template>
<style>
.schemafiller .input-group input { width: 100%; }
.schemafiller .row       { display:flex; }
.schemafiller .column    { display:flex; flex-direction: column;}
.schemafiller .width-100 { width: 100%; padding-right: 8px; }
.schemafiller .width-70  { width:  70%; padding-right: 8px; }
.schemafiller .width-50  { width:  50%; padding-right: 8px; }
.schemafiller .width-30  { width:  30%; padding-right: 8px; }
</style>
<script>
export default {
	name: 'content-filler',

	props: ['dson', 'schema'],

	data(){
		return {}
	},
}
</script>