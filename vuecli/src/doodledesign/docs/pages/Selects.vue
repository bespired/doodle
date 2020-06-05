<template>
    <div class="container">
        <div class="title bigger">Basic Elements</div>
        <div class="title big">Inputs</div>

        <div class="title">Select</div>

        <div class="flex-80">
            <od-custom-function funcName="barslayout" :callback="this.layout" />
            <od-custom-select
                label     = "Custom select"
                vmodel    = "funcValue"
                :options  = "funcOptions"
                funcName  = "barslayout"
            />
        </div>
        <od-codeview :openbutton="true" :overlap="true">
            <pre>
                (*od-custom-function funcName="barslayout" :callback="this.layout" /*)
                (*od-custom-select
                    label     = "Custom select"
                    vmodel    = "funcValue"
                    :options  = "funcOptions"
                    funcName  = "barslayout"
                /*)

                data:{
                    return {
                        funcValue: 1,
                        funcOptions: [
                            { id: 1, value: '1' , title: "6-6", arr: [6,6] },
                            { id: 2, value: '2' , title: "3-3", arr: [3,3,3,3] }
                        ],
                    }
                }
                ...
                methods:{
                    layout(options) {
                    let ret = ""
                    options.arr.forEach(size =>{
                        ret += `(*span class="blox-${size}" /*)`
                    })
                    return ret
                },
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

        <div class="flex-80">
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
            callback: `
                layout(arr) {
                    let ret = ""
                    arr.forEach(size =>{
                        ret += \`<span class="blox-!{size}"></span>\`
                    })
                    return ret
                },
            `,

            funcValue: 1,
            funcOptions: [
                { id: 1, value: '1' , title: "6-6", arr: [6,6] },
                { id: 2, value: '2' , title: "3-3", arr: [3,3,3,3] }
            ],

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

    methods:{
        layout(options) {
            let ret = ""
            options.arr.forEach(size =>{
                ret += `<span class="blox-${size}"></span>`
            })
            return ret
        },
    }

}
</script>

<style>
    .od-custom-select{
        display: flex;
        width: 100%;
    }
    .blox-3 ,.blox-6{
        display: inline-block;
        background-color: #13a6b5;
        border: 1px solid #1b5c63;
        border-radius: 4px;
        height: 22px;
        margin-right: 2px;
    }
    .blox-3 {
        width: 40%;
    }
    .blox-6 {
        width: 50%;
    }
</style>
