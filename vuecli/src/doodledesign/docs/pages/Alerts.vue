<template>
	<div class="container">
		<div class="title bigger">Modals</div>

		<div class="title big">Login</div>
		<div class="flex">
			<od-button @click="login()" class="action" >Login</od-button>
		</div>

		<div class="title big">Confirm</div>
		<div class="title">Sure?</div>
		<div class="flex">
			<od-button @click="sure('danger')"  class="danger  left-icon" icons="x"     >Sure?</od-button>
			<od-button @click="sure('success')" class="action  left-icon" icons="ok"    >Sure?</od-button>
			<od-button @click="sure('warning')" class="warning left-icon" icons="alert" >Sure?</od-button>
		</div>
		<div class="flex">
			<od-codeview :openbutton="true" :overlap="true">
				<pre>
				(*od-button @click="sure('danger')"  class="danger  left-icon" icons="x"     *)Sure?(*/od-button*)
				(*od-button @click="sure('success')" class="action  left-icon" icons="ok"    *)Sure?(*/od-button*)
				(*od-button @click="sure('warning')" class="warning left-icon" icons="alert" *)Sure?(*/od-button*)

				methods:{
					this.$options.confirmModal.open('Are you sure?', `Check it out`, 'Sure', {type: type})
						.then((confirm) => {
							if (confirm){
								this.$store.commit('doodlegui/addAlertPanel',
									{ name:"sure", type: 'success', title:"Sure", message:"Yes they are sure." })
							}else{
								this.$store.commit('doodlegui/addAlertPanel',
									{ name:"sure", type: 'danger', title:"Not sure", message:"No, don't do it." })
							}
						})
				}
				</pre>
			</od-codeview>
		</div>


		<div class="title big">Alerts</div>
		<div class="title">Dynamic</div>
		<div class="flex">
			<od-button @click="alert('info')"> Info </od-button>
		</div>
		<div class="flex">
			<od-codeview :openbutton="true" :overlap="true">
				<pre>
				(*od-button @click='alert('info')*) Info (*/od-button*)

				methods:{
					alert(type){
						this.$store.commit('doodlegui/addAlertPanel',
							{name:"saved", type: type, title:"Saved", message:"Your file is saved."})
					}
				}
				</pre>
			</od-codeview>
		</div>
		<div class="title">Static</div>
		<div class="flex">
			<od-alert index="saved" type="success" title="Saved" message="Your file is saved."   />
			<od-alert index="error" type="error"   title="Error" message="Something went wrong." />

			<od-button class="success" commit="doodlegui/addNamedAlertPanel:saved"> Alert     </od-button>
			<od-button class="danger"  commit="doodlegui/addNamedAlertPanel:error"> Red Alert </od-button>
			<od-button class="second"  @click="$store.dispatch('doodlegui/addNamedAlertPanel', 'error')"> Error </od-button>
			<od-codeview :openbutton="true" :overlap="true">
				<pre>
				(*od-alert index="saved"   type="success" title="Saved" message="Your file is saved."   /*)
				(*od-alert index="error"   type="error"   title="Error" message="Something went wrong." /*)

				(*od-button class="success" commit="doodlegui/addNamedAlertPanel:saved"*) Alert     (*/od-button*)
				(*od-button class="danger"  commit="doodlegui/addNamedAlertPanel:error"*) Red Alert (*/od-button*)
				(*od-button class="second"  @click="$store.dispatch('doodlegui/addNamedAlertPanel', 'error')"*) Error (*/od-button*)
				</pre>
			</od-codeview>
		</div>
	</div>

</template>

<script>

export default {
	name: 'alerts',
	methods:{
		alert(type){
			this.$store.commit('doodlegui/addAlertPanel', {name:"saved", type: type, title:"Saved", message:"Your file is saved."})
		},

		sure(type){
			this.$options.confirmModal.open('Are you sure?', `Check it out`, 'Sure', {type: type})
				.then((confirm) => {
					if (confirm){
						this.$store.commit('doodlegui/addAlertPanel',
							{ name:"sure", type: 'success', title:"Sure", message:"Yes they are sure." })
					}else{
						this.$store.commit('doodlegui/addAlertPanel',
							{ name:"sure", type: 'danger', title:"Not sure", message:"No, don't do it." })
					}
				})
		},

		login(){
			// //_/auth/v1/login
			this.$options.loginModal.open('???')
				.then ((confirm) => { console.log( 'confirm action' ) })
				.catch((cancel)  => { console.log( 'cancel  action' ) })
		}

	}
}
</script>
