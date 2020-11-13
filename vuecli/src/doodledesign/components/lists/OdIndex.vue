<template>
    <div v-if="items && Object.keys(items)" class="od-index" >
        <!-- <od-tabmenu vmodel="tabValue" :tabs="tabmenu" v-if="hasTabmenu" /> -->

        <od-index-thumbs :thumbs="filtered" :key="`t-${searchValue}`" :route="route" v-if="toggleState"/>
        <od-index-rows   :rows="filtered"   :key="`r-${searchValue}`" :route="route" v-else />
    </div>
</template>

<script>

export default {
    name: 'od-index',
    props: ['route', 'items'],

    data(){
        return {
            path     : this.route.replace(/s+$/,''),
            // tabValue : this.retrieveTab(),
            // tabName  : this.slugify(document.location.pathname),
        }
    },

    computed: {
        // tabmenu(){
        //     let tabs = {}
        //     let keys = Object.keys(this.items)
        //     keys.forEach((key)=>{
        //         let item = this.items[key]
        //         if ( item.hasOwnProperty('area') ) {
        //             tabs.all= 'All'
        //             tabs[item.area]= item.area
        //         }
        //     })
        //     return tabs
        // },

        // hasTabmenu(){
        //     return Object.keys(this.tabmenu).length
        // },

        searchValue(){
            return this.$store.getters['doodlegui/getSearchValue']
        },

        indexSelected() {
            return this.$store.getters['doodlegui/getIndexSelected']
        },

        toggleState(){
            return !this.$store.getters['doodlegui/getToggleState']('thumbs-type-rows')
        },

        // keys(){
        //     let key= ''
        //     this.indexSelected.forEach((i)=>{
        //         key += i.substr(-6) + '-'
        //     })
        //     return key
        // },

        filtered(){
            // this.storeTab()

            let buffer = this.clonedub(this.items)
            // if ( (this.hasTabmenu) && (this.tabValue !== 'all') ){
            //     buffer = buffer.filter(item => {
            //         return item.area.toLowerCase() === this.tabValue.toLowerCase()
            //     })
            // }
            if ( this.searchValue !== '' ){
                buffer = buffer.filter(item => {
                    return item.label.toLowerCase().indexOf(this.searchValue.toLowerCase()) >-1
                })
            }
            return buffer
        },
    },

    methods:{
        // storeTab(){
        //     sessionStorage.setItem(`doodle.tab.${this.tabName}`, this.tabValue)
        // },
        // retrieveTab(){
        //     let tabValue = sessionStorage.getItem(`doodle.tab.${this.tabName}`)
        //     return tabValue ? tabValue : 'all'
        // },
    }

}
</script>