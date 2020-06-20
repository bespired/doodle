import Vue from 'vue'
import DoodleDesign from "./components";

import "./scss/doodle-app.scss";

Vue.prototype.$eventHub = new Vue(); // Global event bus

Vue.mixin({

	methods: {
		capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
		odID: str => 'od-' + str + '-' + Math.ceil(1e9 * Math.random()).toString(36).substr(-5)
	},

	beforeCreate() {
		let optionName = this.$options.name
		let number = '-' + Math.ceil(1e9 * Math.random()).toString(36).substr(-6)
		if (optionName) {
			this.$options.namedId = this.$options.name + number
		} else {
			this.$options.namedId = 'doodle' + number
		}
	},

	mounted() {
		if ( this.$root.$children[0] !== undefined ){
			this.$options.confirmModal = this.$root.$children[0].$refs.confirm
			this.$options.loginModal   = this.$root.$children[0].$refs.login
		}
	}

})


Vue.directive('out', {
    bind: function (el, binding, vNode) {
        const handler = (e) => {
            if (!el.contains(e.target) && el !== e.target) {
                vNode.context[binding.expression] = false
            }
        }
        el.out = handler
        document.addEventListener('click', handler)
    },

    unbind: function (el, binding) {
        document.removeEventListener('click', el.out)
        el.out = null
    }
})

Object.keys(DoodleDesign).forEach((name) => {
	// console.log(name, DoodleDesign[name].name, DoodleDesign[name])
	Vue.component(DoodleDesign[name].name, DoodleDesign[name]);
});