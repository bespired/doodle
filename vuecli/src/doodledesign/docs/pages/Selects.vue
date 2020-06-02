<template>
    <div class="container">
        <div class="title bigger">Basic Elements</div>
        <div class="title big">Inputs</div>

        <div class="title">Select</div>

        <div class="flex-80">

        <!--
            <od-custom-template sname="store-options"

                <img class="option__image" :src="option.img" alt="No Man’s Sky" />
                <span class="option__desc">
                    <span class="option__title">{{ option.title }}</span>
                </span>

            />
        -->
            <od-custom-select
                label        = "Custom select"
                vmodel       = "imageValue"
                :options     = "imageOptions"

                :single      = "single"
                :list        = "list"
            />
        </div>

        <od-codeview :openbutton="true" :overlap="true">
            <pre>
            (*od-custom-select
                vmodel       = "imageValue" :options     = "imageOptions"
                track-by     = "value"      label        = "title"
                :single      = "single"     :list        = "list"
            /*)

            data(){
                return {
                    imageValue: '1',
                    imageOptions: [
                        { value: '1' , title: "Random img", img: "https://picsum.photos/300/150" },
                        { value: '2' , title: "Cool image", img: "https://picsum.photos/300/151" }
                    ],
                    single: `(*span class="option__title"*)({ title })(*/span*)`,
                    list:   `(*span*)
                                (*img class="option__image" :src="img" :alt="title" /*)
                                (*span class="option__desc"*)
                                    (*span class="option__title"*)({ title })(*/span*)
                                (*/span*)
                            (*/span*)`,
                }
            }
            </pre>
        </od-codeview>

        <div class="flex-80">
            <od-select label="VueModel options" vmodel="selected" :options="options" />
        </div>
        <od-codeview :openbutton="true" :overlap="true">
            <pre>
                (*od-select vmodel="selected" :options="options" /*)
            </pre>
        </od-codeview>

        <div class="flex-80">
            <od-options sname="store-options" :options="options" />
            <od-select label="StoreModel select, model options" smodel="selected" :options="options" />
            <od-select label="StoreModel select, store options" smodel="selected" soptions="store-options" />
        </div>

        <!--
        <od-codeview :openbutton="true" :overlap="true">
            <pre>
                (*od-select smodel="options" :options="options" /*)
                (*od-select smodel="options" soptions="store-options" /*)
                // you'll need to create some first...
                (*od-options sname="store-options" :options="options" /*)
            </pre>
        </od-codeview>

        <div class="flex-80">
            <od-select label="Tags" vmodel="tagselected" :options="tagoptions" tags />
        </div>
        <od-codeview :openbutton="true" :overlap="true">
            <pre>
                (*od-select smodel="options" /*)
            </pre>
        </od-codeview>

        <div class="flex-80">

            <od-select-template name="layout">
                <span class="option__title"></span>
            </od-select-template>

            <od-select label="custom template options" vmodel="custom" custom="layout" />

        </div>
        <od-codeview :openbutton="true" :overlap="true">
            <pre>
                (*od-select smodel="options" /*)
            </pre>
        </od-codeview>
    -->


    </div>
</template>

<script>

export default {
    name: 'selects',
    data(){
        return {
            imageValue: 1,
            imageOptions: [
                { value: '1' , title: "Random img", img: "https://picsum.photos/300/151" },
                { value: '2' , title: "Cool image", img: "https://picsum.photos/300/150" }
            ],
            single: `<span class="option__title">{{ title }}</span>`,
            list:   `<span>
                        <img class="option__image" :src="img" :alt="title" />
                        <span class="option__desc">
                            <span class="option__title">{{ title }}</span>
                        </span>
                    </span>`,

            selected: 1, // well no, should be { label: 'label 1', value: '1' , id: 1 },
            options:[
                { label: 'label 1', value: '1' , id: 1 },
                { label: 'label 2', value: '2' , id: 2 }
            ],

            tagselected: [
                { label: 'tag 1', value: 'tag_1' , id: 1 }
            ],
            tagoptions:[
                { label: 'tag 1', value: 'tag_1' , id: 1 },
                { label: 'tag 2', value: 'tag_2' , id: 2 }
            ],
            custom: 'option_1',
            customoptions:[
                { label: 'option 1', value: 'option_1' , id: 1 },
                { label: 'option 2', value: 'option_2' , id: 2 },
                { label: 'option 3', value: 'option_3' , id: 3 },
            ],




        }
    },
}
</script>
