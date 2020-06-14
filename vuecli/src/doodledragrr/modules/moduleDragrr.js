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

        saveCurrentTemplate(context, payload){
            console.log( '-->', context.state.currentTemplate )
            context.state.apis.dragrrApi.saveTemplates('layout', context.state.currentTemplate)
                .then( result => {
                    context.dispatch('doodlegui/addNamedAlertPanel', 'saved', {root:true})
                })
                .catch((cancel) => {
                    context.dispatch('doodlegui/addNamedAlertPanel', 'not-saved', {root:true})
                })
        }

    },

}