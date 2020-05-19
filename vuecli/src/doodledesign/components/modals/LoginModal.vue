<template>
	<div id="login-modal" class="confirm confirm--small" :key="version"
			:class="[dialog ? 'confirm--open' : '']"
			@keydown.esc   = "cancel()"
			@keydown.enter = "login()"
		>
		<div class="modal--dialog">
			<div class="modal--content">
				<div class="form">
					<div class="modal--body">
						<div class="modal--title">{{ title }}</div>
						<od-text-input
							prefix="email"
							minWidth="4"
							label="email"
							type="email"
							autocomplete="doodle-email"
							required
							vmodel="credentials.email"
						/>
						<od-text-input
							prefix="password"
							minWidth="4"
							label="password"
							type="password"
							autocomplete="doodle-password"
							required
							vmodel="credentials.password"
						/>
						<div class="alert alert--danger" v-if="error" :data-error="error">
							These credentials do not match our records.
						</div>
					</div>
					<div class="modal--footer">
						<od-button class="cancel left-icon" icons="x"    @click.self="cancel()">Cancel</od-button>
						<od-button class="action left-icon" icons="user" @click.self="login()" >Login </od-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login-modal',
		data() {
			return {
				dialog: false,
				url: null,
				resolve: null,
				reject:  null,
				title: 'Please enter your credentials to log in',
				error: null,
				version: 0,
				credentials: {
					email: null,
					password: null
				},
			};
		},

		watch: {
			dialog(newValue){
				this.version++
				this.credentials= {
					email: null,
					password: null
				}
			}
		},

		methods: {
			open(url) {
				this.url    = url;
				this.dialog = true;
				return new Promise((resolve, reject) => {
					this.resolve = resolve;
					this.reject  = reject;
				})
			},

			login() {
				global.axios.post(this.url, this.credentials)
				.then( (response) => {
					this.dialog = false;
					this.resolve(response.data);

				}, (e) => {
					this.error = e.response.data.error;

				});
			},
			cancel() {
				this.dialog = false;
				this.reject(true);
			}
		}
	};
</script>