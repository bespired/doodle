import Vue from 'vue'
import Vuex from 'vuex'
import Helpers from '../helpers/helpers.js'


Vue.use(Vuex)

export default {

    namespaced: true,

    state: {
        doodleGui: true,

        alertPanels: {
            display : [{ id: 1, type: 'info',  title: 'Welcome.', message: 'Doodle Design is loaded.' }],
            slotted : {}
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

        texts: {
            // slots for drop down states
        },
    },

    getters: {
        getAlertPanels:  state  => state.alertPanels.display,
        getToggleState: (state) => item => {
            if ( state.toggles[item] === undefined ) Vue.set(state.toggles, item, false)
            return state.toggles[item]
        },
        getRadioState: (state) => item => {
            if ( state.radiorows[item] === undefined ) Vue.set(state.radiorows, item, false)
            return state.radiorows[item]
        },
        getFoldState: (state) => item => {
            if ( state.folds[item] === undefined ) Vue.set(state.radiorows, item, false)
            return state.folds[item]
        },
        getTabState: (state) => item => {
            if ( state.tabs[item] === undefined ) Vue.set(state.tabs, item, null)
            return state.tabs[item]
        },
        getTextValue: (state) => item => {
            if ( state.texts[item] === undefined ) Vue.set(state.texts, item, null)
            return state.texts[item]
        }
    },

    mutations: {
        prepareAlertPanel (state, payload) { state.alertPanels.slotted[payload.index]= payload    },
        setToggleState    (state, payload) { Vue.set(state.toggles,   payload.key, payload.value) },
        setTabState       (state, payload) { Vue.set(state.tabs,      payload.key, payload.value) },
        setRadioState     (state, payload) { Vue.set(state.radiorows, payload.key, payload.value) },
        setFoldState      (state, payload) { Vue.set(state.folds,     payload.key, payload.value) },
        setDropdownState  (state, payload) { Vue.set(state.dropdowns, payload.key, payload.value) },
        setTextValue      (state, payload) { Vue.set(state.texts,     payload.key, payload.value) },
        addAlertPanel (state, payload) {
            let now = new Date().getTime()
            payload.id = Helpers.uuid(payload.title)
            payload.created_at = now
            state.alertPanels.display.push(Helpers.clone(payload))
        },
        removeAlertPanel (state, id)      {
            state.alertPanels.display.forEach((panel, idx)=>{
                if ( panel.id === id ) state.alertPanels.display.splice(idx, 1)
            })
        },
    },

    actions: {
        addNamedAlertPanel (context, index) {
            context.commit('addAlertPanel', context.state.alertPanels.slotted[index])
        }
    },

}
