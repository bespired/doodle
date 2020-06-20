import Vue       from 'vue'
import Vuex      from 'vuex'
import DragrrApi from '../packages/dragrr'

Vue.use(Vuex)

export default {

    namespaced: true,

    state: {
        mainDragrr: true,

        apis: {
            dragrrApi: new DragrrApi(),
        },

        widgetTemplates:  null,
        widgetTemplateId: null,

        layoutTemplates:  null,
        layoutTemplateId: null,

        sectionTemplates:  null,
        sectionTemplateId: null,

        currentTemplate: null,

    },

    getters: {
        getWidgetTemplates:  (state) => { return state.widgetTemplates  },
        getLayoutTemplates:  (state) => { return state.layoutTemplates  },
        getSectionTemplates: (state) => { return state.sectionTemplates },
        currentTemplate:     (state) => {
            if ( state.currentTemplate  === null ) return null
            if ( state.currentTemplate.error !== undefined ) {
                console.error( isNotEmtpy.error ); return null;
            }
            return state.currentTemplate
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
        // General for Layout and Section
        setTemplates(state, payload)  {
            state[`${payload.source}Templates`] = payload.templates
        },
        addTemplate(state, payload)    {
            state[`${payload.source}Templates`].push(payload.template)
        },
        removeTemplates(state, payload){
            let stateTemplates = `${payload.source}Templates`
            payload.removedHandles.forEach((h)=>{
                state[stateTemplates].forEach((t, i)=>{
                    if ( t.handle === h )  {
                        state[stateTemplates].splice(i, 1)
                    }
                })
            })
        },

        // Current
        clearCurrentTemplate(state) { state.currentTemplate = null },
        setCurrentTemplate(state, payload) {
            const source    = payload.source
            const handle    = payload.handle
            const templates = state[`${source}Templates`]

            state.currentTemplate = null;
            if ( templates === null ) return

            const result = templates.filter(template => template.handle === handle)
            state.currentTemplate = result.length ? result[0] : { error: 'cannot find template handle.' }
        },

    },

    actions: {
        getWidgetTemplates(context, payload){
            const source = 'widget'
            if ( payload.force || context.state.widgetTemplates === null ){
            context.state.apis.dragrrApi.getTemplates('widget')
                .then( result => {
                    context.commit('setTemplates', { source:source,  templates: result })
                    if (context.state.widgetTemplateId){
                        const handle = context.state.widgetTemplateId
                        context.state.widgetTemplateId = null
                        context.commit('setCurrentTemplate', { source: 'widget', handle: handle })
                    }
                })
            }
        },
        getLayoutTemplates(context, payload){
            const source = 'layout'
            if ( payload.force || context.state.layoutTemplates === null ){
            context.state.apis.dragrrApi.getTemplates('layout')
                .then( result => {
                    context.commit('setTemplates', { source:source,  templates: result })
                    if (context.state.layoutTemplateId){
                        const handle = context.state.layoutTemplateId
                        context.state.layoutTemplateId = null
                        context.commit('setCurrentTemplate', { source: 'layout', handle: handle })
                    }
                })
            }
        },
        getSectionTemplates(context, payload){
            const source = 'section'
            if ( payload.force || context.state.sectionTemplates === null ){
            context.state.apis.dragrrApi.getTemplates('section')
                .then( result => {
                    context.commit('setTemplates', { source:source,  templates: result })
                    if (context.state.sectionTemplateId){
                        const handle = context.state.sectionTemplateId
                        context.state.sectionTemplateId = null
                        context.commit('setCurrentTemplate', {source: 'section', handle: handle })
                    }
                })
            }
        },

        setCurrentTemplate(context, payload){
            const source    = payload.source
            const handle    = payload.handle
            const templates = context.state[`${source}Templates`]
            const getter    = `get${source.capitalize()}Templates`

            // load all referenced templates...
            if (( source === 'section' ) && ( context.state.layoutTemplates === null ))
                context.dispatch('getLayoutTemplates', { force: true })

            if (templates === null) {
                context.state[`${source}TemplateId`]= handle
                context.dispatch(getter, { force: true })
                return
            }else{
                context.commit('setCurrentTemplate', payload)
            }

        },

        exportTemplates(context, payload){
            context.state.apis.dragrrApi.exportTemplates(payload.source, payload.handles)

        },

        deleteTemplates(context, payload){
            context.commit('removeTemplates', {source: payload.source, removedHandles: payload.handles})
            context.state.apis.dragrrApi.deleteTemplates(payload.source, payload.handles)
            .then( result => {
                context.commit('doodlegui/clearIndexSelected', null, {root:true})
                context.dispatch('doodlegui/addNamedAlertPanel', 'deleted', {root:true})
            })
            .catch((cancel) => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'no-delete', {root:true})
            })
        },

        createTemplate(context, payload){
            context.state.apis.dragrrApi.createTemplate(payload.source)
            .then( result => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'created', {root:true})
                context.commit('addTemplate', { source: payload.source, template: result.data })
            })
        },

        saveCurrentTemplate(context, payload){
            context.state.apis.dragrrApi.saveTemplates(payload.source, context.state.currentTemplate)
            .then( result => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'saved', {root:true})
            })
            .catch((cancel) => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'not-saved', {root:true})
            })
        }

    },

}