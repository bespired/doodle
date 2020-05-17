<template>
	<od-ready :ready="differences" >
		<od-foldable>
			<template v-for="(stage,index) in differences" >
				<od-fold-header :label="stage.label" :key="stage.name" />
				<od-fold-body :key="`body-${stage.name}`">
					<od-foldable>
						<template v-for="data in stage.stages">
							<od-fold-header :label="data.label" :key="data.name" />
							<od-fold-body :key="`body-${data.name}`">
								<od-foldable>
									<template v-for="(database, name) in data.structure">
										<od-fold-header :label="`Database: ${name}`" :key="`header-${data.name}-${name}`" />
										<od-fold-body :key="`body-${data.name}-${name}`" >
											<od-tag-listing :list="database" />
										</od-fold-body>
									</template>
								</od-foldable>
							</od-fold-body>
						</template>
					</od-foldable>
				</od-fold-body>
			</template>
		</od-foldable>
	</od-ready>
</template>

<script>

export default {
	name: 'differences',

	mounted() {
		this.$store.dispatch('index/setCredentials', {client: 1, project: 1 })
		this.$store.dispatch('index/getDifferences')
	},

	computed: {
		differences() {
			return this.$store.getters['index/differences']
		},
	},

}
</script>
