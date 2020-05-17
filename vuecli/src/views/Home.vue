<template>
	<section>
		<title-panel>
			<h1>Doodle</h1>
		</title-panel>
	</section>
</template>

<script>

export default {
	name: 'home',

	beforeMount(){
		document.body.classList.add('homepage')
	},
	beforeDestroy(){
		document.body.classList.remove('homepage')
	},

}
</script>
