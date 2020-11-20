<template>
    <div class="input-group">
        <label :for="$options.namedId" >
            {{ label }}
        </label>
        <div id="od-upload" class="area">
                <div class="drop-container input-row"
                        @dragover.prevent="hover = true"
                        @dragleave.prevent="hover = false"
                        @drop.prevent="dropped"
                    :class="{hover : hover}"
                >
                    <div class="preview-area" :id="canvasId" v-show="imgfile" />

                    <div class="drop-area" v-if="!imgfile">
                        <p>
                            <od-iconpath name="image" /> Drop image here
                        </p>
                    </div>

                    <div class="menu-over" v-if="imgfile">
                        <span class="input-button" @click="clear()">×</span>
                    </div>

                    <div class="progress-over" v-show="uploading" v-if="percentage > 0">
                        <div>{{ percentage }}%</div>
                        <od-progressbar :value="percentage" :max="100" />
                    </div>
                    <div class="info-over" v-if="imgfile">
                        <div>{{ imgfile.name }}</div>
                    </div>
                </div>
        </div>
    </div>
</template>


<style lang="scss">
</style>

<script>

import Vue from 'vue'

export default {

    name: 'od-image-input',

    props: {
        owner:        { type: String,  default: null },
        vmodel:       { type: String,  default: null },
        smodel:       { type: String,  default: null },
        label:        { type: String,  default: null },
    },

    data() {
        return {
            files: [],
            uploading: true,
            percentage: 0,
            canvasId: `${this.$options.namedId}-preview` ,

            hover: false,
            imgfile: null,
            url: '',
        };
    },

    created() {
        this.getUrl();
    },

    computed: {
        apiUrl() {
            return this.$store.getters['dragrr/getApiUrl']
        },
    },

    methods: {

        getUrl(){
            let location = `${document.location.protocol}//${document.location.hostname}`

            axios.get(`${location}/api/image/url/${this.owner}`)
            .then((response) => {
                let bgcanvas = document.getElementById(this.canvasId)

                let rect   = bgcanvas.getBoundingClientRect()
                let factor = response.data.height / response.data.width
                let width  = Math.max(512, rect.width )
                let height = Math.min(200, Math.floor(width * factor))
                bgcanvas.style.backgroundImage = 'url(' + response.data.url + ')';
                bgcanvas.style.height = `${height}px`

                this.imgfile = response.data

            }).catch((error) => {
                console.log(error);
            });
        },

        clear() {
            this.imgfile= null
        },

        dropped(event) {
            const dt    = event.dataTransfer;
            const keys  = Object.keys(dt.items)

            keys.forEach((key) => {
                let item = dt.items[key]
                let file = item.getAsFile();
                file.extension = file.name.split('.').pop();

                if (['png', 'jpg', 'jpeg'].indexOf(file.extension) > -1) {
                    console.log( '-->' ,  file )
                    this.imgfile = file
                }
            })

            this.hover = false

            if (this.imgfile) {
                this.previewFile(this)
                this.uploadFiles(this)
            }

        },

        previewFile(context) {
            let reader = new FileReader()
            reader.readAsDataURL(this.imgfile)

            reader.onloadend = function() {
                let bgcanvas = document.getElementById(context.canvasId)

                bgcanvas.style.backgroundImage = 'url(' + reader.result + ')';

                var image      = new Image();
                image.src      = reader.result;
                image.bgcanvas = bgcanvas;

                image.onload = function() {
                    let rect   = this.bgcanvas.getBoundingClientRect()
                    let factor = this.height / this.width
                    let height = Math.min(200, Math.floor(rect.width * factor))
                    this.bgcanvas.style.height = `${height}px`
                };

            }
        },

        uploadFiles(context) {
            let formData = new FormData();

            formData.append('owner', context.owner);
            formData.append('image', context.imgfile);

            context.uploading = true;

            const location = `${context.apiUrl}/image/upload`
            axios.post(location, formData, {
                onUploadProgress: (e) => {
                    context.percentage = Math.floor((e.loaded * 100) / e.total);
                },
            }).then((response) => {

                let data = response.data;
                context.uploading  = false;
                context.percentage = 0;

                // this.$emit('uploaded', { data });
            }).catch((error) => {
                console.log(error);
            });
        },
    },
};

</script>