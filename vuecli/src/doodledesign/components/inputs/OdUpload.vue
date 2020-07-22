<template>
    <div id="od-upload" class="area"
            @dragover.prevent  = "hover = true"
            @dragleave.prevent = "hover = false"
            @drop.prevent = "dropped"
        >
        <div class="area__dialog">
            <div class="area__content">
                <div class="area__body" v-show="!uploading">
                    <div id="drop-container" :class="{hover : hover}">
                        <p>
                            {{ label }}
                        </p>
                    </div>
                    <div v-if="files.length">
                        <ul class="list-group">
                            <li v-for="(file, key) in files" class="list-group__item" v-bind:key="key">
                                <input type="text" :value="file.name" />
                                <span class="float-right">{{ file.size }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="area__footer" v-show="!uploading">
                    <router-link :to="{ name: cancel }" class="button button--cancel">Cancel</router-link>
                    <button class="button button--secondary" v-if="files.length" @click="reset">
                        Clear
                    </button>
                    <button class="button button--success" v-if="files.length" @click="uploadFiles">
                        Upload {{ files.length }} file{{ files.length == 1 ? '' : 's' }}
                    </button>
                </div>
                <div class="area__body" v-show="uploading">
                    <div class="alert">
                        <h3 class="alert__title">Uploading in progress</h3>
                        {{ percentage }}%
                        <od-progressbar :value="percentage" :max="100" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Vue from 'vue'

export default {

    name: 'od-upload',

    props: ['label', 'cancel', 'uploadUrl'],

    data() {
        return {
            files: [],
            uploading: false,
            percentage: 0,

            hover: false
        };
    },

    mounted() {
        // this.bindEvents();
    },

    methods: {

        reset() {
            this.files = [];
            this.uploading = false;
            this.percentage = 0;
        },

        dropped(event) {
            const dt = event.dataTransfer;
            const keys = Object.keys(dt.items)
            keys.forEach((key) => {
                let item = dt.items[key]
                let file = item.getAsFile();
                file.extension = file.name.split('.').pop();

                if (['yml', 'yaml','xml', 'json'].indexOf(file.extension) > -1) {
                    this.files.push(file);
                }
            })
            this.hover = false
        },

        uploadFiles() {
            let data = new FormData();
            let files = this.files
            let keys = Object.keys(files)
            keys.forEach((key) => {
                data.append(files[key].name, files[key]);
            })

            this.uploading = true;

            axios.post(this.uploadUrl, data, {
                onUploadProgress: (e) => {
                    this.percentage = Math.floor((e.loaded * 100) / e.total);
                },
            }).then((response) => {
                data = response.data;
                this.$emit('uploaded', { data });
                this.reset();
            }).catch((error) => {
                console.log(error);
            });
        },
    },
};

</script>