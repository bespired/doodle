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

        layoutTemplates:  null,
        layoutTemplateId: null,

        currentTemplate: null,

    },

    getters: {
        getLayoutTemplates: (state) => { return state.layoutTemplates },
        currentTemplate:    (state) => {
            if ( state.currentTemplate  === null ) return null
            if ( state.currentTemplate.error !== undefined ) {
                console.error( isNotEmtpy.error )
                return null
            }
            return state.currentTemplate
        },

    },

    mutations: {
        setLayoutTemplates(state, layoutTemplates){ state.layoutTemplates = layoutTemplates },

        removeLayoutTemplates(state, removedHandles){
            removedHandles.forEach((h)=>{
                state.layoutTemplates.forEach((t, i)=>{
                    if ( t.handle === h )  state.layoutTemplates.splice(i, 1)
                })
            })
        },

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
        getLayoutTemplates(context, payload){
            if ( payload.force || context.state.layoutTemplates === null ){
            context.state.apis.dragrrApi.getTemplates('layout')
                .then( result => {
                    context.commit('setLayoutTemplates', result )
                    if (context.state.layoutTemplateId){
                        const handle = context.state.layoutTemplateId
                        context.state.layoutTemplateId = null
                        context.commit('setCurrentTemplate', {source: 'layout', handle: handle })
                    }
                })
            }
        },

        setCurrentTemplate(context, payload){
            const source    = payload.source
            const handle    = payload.handle
            const templates = context.state[`${source}Templates`]
            const getter    = `get${source.capitalize()}Templates`

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
            context.state.apis.dragrrApi.deleteTemplates(payload.source, payload.handles)
            .then( result => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'deleted', {root:true})
                context.commit('removeLayoutTemplates', payload.handles)

            })
            .catch((cancel) => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'no-delete', {root:true})
            })
        },

        createTemplate(context, payload){

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