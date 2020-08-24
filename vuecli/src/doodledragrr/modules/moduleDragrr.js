import Vue       from 'vue'
import Vuex      from 'vuex'
import DragrrApi from '../packages/dragrr'

Vue.use(Vuex)

import Helpers from '../../helpers.js'

export default {

    namespaced: true,

    state: {
        mainDragrr: true,

        apis: {
            dragrrApi: new DragrrApi(),
        },

        // classTemplates:  null,
        // classTemplateId: null,
        // or
        classTemplates:  { fonts: null, sizes: null, borders: null },
        classTemplateId: { fonts: null, sizes: null, borders: null },

        elementTemplates:  null,
        elementTemplateId: null,

        layoutTemplates:  null,
        layoutTemplateId: null,

        sectionTemplates:  null,
        sectionTemplateId: null,

        themeTemplates:  null,
        themeTemplateId: null,

        widgetTemplates:  null,
        widgetTemplateId: null,

        currentTemplate: null,

        settings: {},

    },


    getters: {
        // this template has sub areas... multiple views, but saved in same DB table.
        getClassTemplates:   (state) => area => { return state.classTemplates[area] },

        getElementTemplates: (state) => { return state.elementTemplates },
        getLayoutTemplates:  (state) => { return state.layoutTemplates  },
        getSectionTemplates: (state) => { return state.sectionTemplates },
        getThemeTemplates:   (state) => { return state.themeTemplates   },
        getWidgetTemplates:  (state) => { return state.widgetTemplates  },

        currentTemplate:     (state) => {
            if ( state.currentTemplate  === null ) return null
            if ( state.currentTemplate.error !== undefined ) {
                console.error( state.currentTemplate.error ); return null;
            }
            return state.currentTemplate
        },

        getSetting:(state) => name =>{
            if ( state.settings[name] === null ) return null
            return state.settings[name]
        },

        getLayoutTemplate:(state) => name =>{
            if ( state.layoutTemplates === null ) return null

            const found = state.layoutTemplates.find(element => {
                return element.name === name
            });
            if ( found.name === name ){
                return found
            }
            return null
        },

    },

    mutations: {
        setSetting(state, payload)  {
            Vue.set(state.settings, payload.source, payload.items)
        },
        // General for Layout and Section and ...
        setTemplates(state, payload)  {
            if ( payload.area !== undefined ){
                state[`${payload.source}Templates`][payload.area]= payload.templates
            }else{
                state[`${payload.source}Templates`] = payload.templates
            }
        },
        addTemplate(state, payload)    {
            const stateTemplates = `${payload.source}Templates`
            if ( payload.area !== undefined ){
                state[stateTemplates][payload.area].push(payload.template)
            }else{
                state[stateTemplates].push(payload.template)
            }
        },
        removeTemplates(state, payload){
            const stateTemplates = `${payload.source}Templates`
            if ( payload.area !== undefined ){
                payload.removedHandles.forEach((h)=>{
                    state[stateTemplates][payload.area].forEach((t, i)=>{
                        if ( t.handle === h )  {
                            state[stateTemplates][payload.area].splice(i, 1)
                        }
                    })
                })
            }else{
                payload.removedHandles.forEach((h)=>{
                    state[stateTemplates].forEach((t, i)=>{
                        if ( t.handle === h )  {
                            state[stateTemplates].splice(i, 1)
                        }
                    })
                })
            }
        },

        // Current
        touchCurrentTemplate(state) { state.currentTemplate.updated_at = new Date() },
        clearCurrentTemplate(state) { state.currentTemplate = null },
        setCurrentTemplate(state, payload) {
            const handle         = payload.handle
            const stateTemplates = `${payload.source}Templates`
            const templates      = (payload.area === undefined) ? state[stateTemplates] : state[stateTemplates][payload.area]

            state.currentTemplate = null;
            if ( templates === null ) return

            const result = templates.filter(template => template.handle === handle)
            state.currentTemplate = result.length ? result[0] : { error: 'cannot find template handle.' }
        },

    },

    actions: {

        getSettings(context, payload){
            const source = payload.source
            let   force  = payload.force
            if ( context.state.settings[source] === undefined  ) force = true
            if ( context.state.settings[source] === null  ) force = true

            if ( force ){
                context.state.apis.dragrrApi.getSettings(source)
                .then( result => {
                    context.commit('setSetting', { source: source, items: result })
                })
            }
        },

        getTemplatedTemplates(context, payload){
            const source    = payload.source
            const area      = payload.area
            const stateName = `${payload.source}Templates`
            const stateId   = `${payload.source}TemplateId`

            if ( area !== undefined ){

                if ( payload.force || context.state[stateName][area] === null ){
                    context.state.apis.dragrrApi.getTemplates(source, area)
                    .then( result => {
                        context.commit('setTemplates', { source: source, area: area, templates: result })
                        if (context.state[stateId][area]){
                            context.commit('setCurrentTemplate', {
                                source: source,
                                area: area,
                                handle: context.state[stateId][area]
                            })
                            context.state[stateId][area] = null
                        }
                    })
                }

            }else{

                if ( payload.force || context.state[stateName] === null ){
                    context.state.apis.dragrrApi.getTemplates(source)
                    .then( result => {
                        context.commit('setTemplates', { source: source, area: area, templates: result })
                        if (context.state[stateId]){
                            context.commit('setCurrentTemplate', { source: source, area: area, handle: context.state[stateId] })
                            context.state[stateId] = null
                        }
                    })
                }
            }
        },

        setCurrentTemplate(context, payload){
            const handle    = payload.handle
            const source    = payload.source
            const area      = payload.area
            const stateName = `${payload.source}Templates`
            const stateId   = `${payload.source}TemplateId`
            let templates   = context.state[stateName]
            let templateId  = context.state[stateId]

            if ( area !== undefined ){
                templates  = templates[area]
                templateId = templateId[area]
            }

            // load all referenced templates...
            if (( source === 'section' ) && ( context.state.layoutTemplates === null ))
                context.dispatch('getTemplatedTemplates', { source: 'layout', force: true })

            if (( source === 'widget' ) && ( context.state.elementTemplates === null ))
                context.dispatch('getTemplatedTemplates', { source: 'element', force: true })

            if (templates === null) {
                templateId= handle
                context.dispatch('getTemplatedTemplates', {
                    source: source,
                    area  : area,
                    force : true
                })
                return

            }else{

                context.commit('setCurrentTemplate', payload)

            }

        },

        exportTemplates(context, payload){
            context.state.apis.dragrrApi.exportTemplates(payload.source, payload.handles)
            .then( response => {
                let filename = response.request.getResponseHeader('X-Filename')
                context.commit('doodlegui/saveToDesktop', {
                    filename: filename ? filename : 'download.yaml',
                    data    : response.data
                }, { root:true })
                context.commit('doodlegui/clearIndexSelected', null, {root:true})
            })
        },

        deleteTemplates(context, payload){
            context.commit('removeTemplates', {
                source: payload.source,
                area: payload.area,
                removedHandles: payload.handles
            })
            context.state.apis.dragrrApi.deleteTemplates(payload.source, payload.handles)
            .then( result => {
                context.commit('doodlegui/clearIndexSelected', null, {root:true})
                context.dispatch('doodlegui/addNamedAlertPanel', 'deleted', {root:true})
            })
            .catch((cancel) => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'no-delete', {root:true})
            })
        },

        duplicateTemplates(context, payload){
            context.state.apis.dragrrApi.duplicateTemplates(payload.source, payload.handles)
            .then( result => {
                context.commit('doodlegui/clearIndexSelected', null, {root:true})
                context.dispatch('getTemplatedTemplates', { source: payload.source, force: true })
                context.dispatch('doodlegui/addNamedAlertPanel', 'duplicated', {root:true})
            })
            .catch((cancel) => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'error', {root:true})
            })
        },

        createTemplate(context, payload){
            context.state.apis.dragrrApi.createTemplate(payload.source, payload.area)
            .then( result => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'created', {root:true})
                context.commit('addTemplate', {
                    source: payload.source,
                    area: payload.area,
                    template: result.data
                })
            })
        },

        saveCurrentTemplate(context, payload){
            context.state.apis.dragrrApi.saveTemplates(payload.source, context.state.currentTemplate)
            .then( result => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'saved', {root:true})
            })
            .catch((cancel) => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'error', {root:true})
            })
        }

    },

}