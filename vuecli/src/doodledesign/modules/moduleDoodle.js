import Vue from 'vue'
import Vuex from 'vuex'
import Helpers from '../helpers/helpers.js'


Vue.use(Vuex)

export default {

    namespaced: true,

    state: {
        doodleGui: true,

        alertPanels: {
            display: [{ id: 1, type: 'info', title: 'Welcome.', message: 'Doodle Design is loaded.' }],
            slotted: {}
        },

        toggles: {
            // slots for toggle states
        },

        tabs: {
            // slots for tab states
        },

        radiorows: {
            // slots for radio states
        },

        folds: {
            // slots for fold list states
        },

        dropdowns: {
            // slots for drop down states
        },

        selects: {
            // slots for select values
        },

        options: {
            // slots for select options
        },

        texts: {
            // slots for text values
        },

        functions: {
            // slots for custom functions
        },

        indexSelected: [
            // slots for selected thumbs
        ],

        searchValue: '',


        multiselect(values, template) {
            function nodeToString(node) {
                var tmpNode = document.createElement("div");
                tmpNode.appendChild(node.cloneNode(true));
                var str = tmpNode.innerHTML;
                tmpNode = node = null; // prevent memory leaks in IE
                return str;
            }

            const el = document.createElement('div')
            const vm = new Vue({
                template: template,
                data: values,
            }).$mount(el)

            return nodeToString(vm.$el)
        },

        customFunction(funcName, options){
            return this.functions[funcName](options)
        },


    },

    getters: {
        getAlertPanels: state => state.alertPanels.display,
        getToggleState: (state) => item => {
            if (state.toggles[item] === undefined) Vue.set(state.toggles, item, false)
            return state.toggles[item]
        },
        getRadioState: (state) => item => {
            if (state.radiorows[item] === undefined) Vue.set(state.radiorows, item, false)
            return state.radiorows[item]
        },
        getFoldState: (state) => item => {
            if (state.folds[item] === undefined) Vue.set(state.radiorows, item, false)
            return state.folds[item]
        },
        getTabState: (state) => item => {
            if (state.tabs[item] === undefined) Vue.set(state.tabs, item, null)
            return state.tabs[item]
        },
        getTextValue: (state) => item => {
            if (state.texts[item] === undefined) Vue.set(state.texts, item, null)
            return state.texts[item]
        },
        getSelectValue: (state) => item => {
            if (state.selects[item] === undefined) Vue.set(state.selects, item, null)
            return state.selects[item]
        },
        getSelectOptions: (state) => item => {
            if (state.options[item] === undefined) Vue.set(state.options, item, [])
            return state.options[item]
        },
        getIndexSelected: (state) => item => {
            if (state.indexSelected === undefined) Vue.set(state, 'indexSelected', [])
            return state.indexSelected
        },
        getgetFunction: (state) => item => {
            if (state.functions[item] === undefined) return null
            return state.functions[item]
        },
        getSearchValue: (state) => { return state.searchValue },

        getSelectedIndex: (state) => {
            return state.indexSelected
        },
    },

    mutations: {
        prepareAlertPanel(state, payload) { state.alertPanels.slotted[payload.index] = payload   },
        setSearchValue(state, payload)    { state.searchValue = payload.value                    },
        setToggleState(state, payload)    { Vue.set(state.toggles, payload.key, payload.value)   },
        setTabState(state, payload)       { Vue.set(state.tabs, payload.key, payload.value)      },
        setRadioState(state, payload)     { Vue.set(state.radiorows, payload.key, payload.value) },
        setFoldState(state, payload)      { Vue.set(state.folds, payload.key, payload.value)     },
        setDropdownState(state, payload)  { Vue.set(state.dropdowns, payload.key, payload.value) },
        setTextValue(state, payload)      { Vue.set(state.texts, payload.key, payload.value)     },


        setCustomFunction(state, payload) {
            state.functions[payload.key]= payload.value
        },

        setSelectValue(state, payload)    { Vue.set(state.selects, payload.key, payload.value)   },
        setSelectOptions(state, payload)  { Vue.set(state.options, payload.key, payload.value)   },

        clearIndexSelected(state)          { state.indexSelected=[]; },
        addIndexSelected(state, handle)    { state.indexSelected.push(handle) },
        removeIndexSelected(state, handle) {
            state.indexSelected.forEach((handle, idx) => {
                if ( state.indexSelected[idx] === handle ){
                    state.indexSelected.splice(idx, 1)
                }
            })
        },


        addAlertPanel(state, payload) {
            let now = new Date().getTime()
            payload.id = Helpers.uuid(payload.title)
            payload.created_at = now
            state.alertPanels.display.push(Helpers.clone(payload))
        },
        removeAlertPanel(state, id) {
            state.alertPanels.display.forEach((panel, idx) => {
                if (panel.id === id) state.alertPanels.display.splice(idx, 1)
            })
        },
    },

    actions: {
        addNamedAlertPanel(context, index) {
            context.commit('addAlertPanel', context.state.alertPanels.slotted[index])
        }
    },

}