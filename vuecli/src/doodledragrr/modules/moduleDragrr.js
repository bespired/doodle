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

        elementTemplates:  null,
        elementTemplateId: null,

        widgetTemplates:  null,
        widgetTemplateId: null,

        layoutTemplates:  null,
        layoutTemplateId: null,

        sectionTemplates:  null,
        sectionTemplateId: null,

        currentTemplate: null,

    },

    getters: {
        getElementTemplates: (state) => { return state.elementTemplates },
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
        getTemplatedTemplates(context, payload){
            const source    = payload.source
            const stateName = payload.source + 'Templates'
            const stateId   = payload.source + 'TemplateId'
            if ( payload.force || context.state[stateName] === null ){
            context.state.apis.dragrrApi.getTemplates(source)
                .then( result => {
                    context.commit('setTemplates', { source: source, templates: result })
                    if (context.state[stateId]){
                        context.state[stateId] = null
                        context.commit('setCurrentTemplate', { source: source, handle: context.state[stateId] })
                    }
                })
            }
        },

        setCurrentTemplate(context, payload){
            const source    = payload.source
            const handle    = payload.handle
            const templates = context.state[`${source}Templates`]

            // load all referenced templates...
            if (( source === 'section' ) && ( context.state.layoutTemplates === null ))
                context.dispatch('getTemplatedTemplates', { source: 'layout', force: true })

            if (templates === null) {
                context.state[`${source}TemplateId`]= handle
                context.dispatch('getTemplatedTemplates', { source: source, force: true })
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