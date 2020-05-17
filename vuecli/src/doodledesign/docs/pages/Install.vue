<template>
	<div class="container">
		<div class="title bigger">Install</div>

		<div class="title">App.vue</div>
		<od-codeview><pre>
		$> npm install systematize
		</pre></od-codeview>

		<div class="title">App.vue</div>
		<od-codeview><pre>
			(*template*)
				(*div id="app"*)
					(*app-header   /*)
					(*router-view  /*)
					(*confirm-modal ref="confirm" /*)
					(*login-modal   ref="login"   /*)
					(*alert-modal   ref="alert"   /*)
				(*/div*)
			(*/template*)

			(*script*)
			import moduleDoodle from './doodledesign/modules/doodleGui';
			export default {
				name: 'app',
			}
			(*/script*)
		</pre></od-codeview>

		<div class="title">main.js</div>
		<od-codeview><pre>
			/* eslint-disable */
			import Vue    from 'vue'
			import App    from './App.vue'
			import global from './global'
			import router from './router'
			import store  from './store'

			import DoodleDesign from './doodledesign/doodle-design';
			import DoodleModule from './doodledesign/modules/doodleGui';
			store.registerModule('doodlegui', DoodleModule)

			Vue.config.productionTip = false

			new Vue({
			  router,
			  store,
			  render: h => h(App),
			}).$mount('#app')
		</pre></od-codeview>
	</div>

</template>

<script>

export default {
	name: 'tools',
}
</script>
