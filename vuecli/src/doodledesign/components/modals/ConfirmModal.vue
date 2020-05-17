<template>
    <div id="confirm-modal" class="confirm confirm--small" :class="[dialog?'confirm--open':'']" @keydown.esc="cancel()">
        <div class="modal--dialog">
            <div class="modal--content">
                <div class="modal--body">
                	<od-sign :type="options.type" />
                    <div class="modal--title">{{ title }}</div>
                    <p>{{ message }}</p>
                </div>
                <div class="modal__footer">
                    <a href="#" class="button cancel" @click="cancel()">Cancel</a>&nbsp;
                    <a href="#" class="button " :class="options.type" @click="agree()" >{{ button }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'confirm-modal',
        data() {
            return {
                dialog: false,
                resolve: null,
                reject: null,
                title: null,
                message: null,
                button: null,
                options: {
                    type : 'danger',
                    zIndex: 200
                }
            };
        },

        methods: {
            open(title, message, button, options) {
                this.dialog = true;
                this.title = title;
                this.message = message;
                this.button = button;
                this.options = Object.assign(this.options, options);
                return new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                })
            },
            agree() {
                this.dialog = false;
                this.resolve(true);

            },
            cancel() {
                this.dialog = false;
                this.resolve(false);

            }
        }
    };
</script>
