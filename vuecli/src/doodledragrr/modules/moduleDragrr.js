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

        layoutTemplates: null,

    },

    getters: {
        getLayoutTemplates: (state) => { return state.layoutTemplates },
    },

    mutations: {
        setLayoutTemplates(state, layoutTemplates){ state.layoutTemplates = layoutTemplates },
    },

    actions: {
        getLayoutTemplates(context){
            context.state.apis.dragrrApi.getTemplates('layout')
                .then( result => {
                    context.commit('setLayoutTemplates', result )
                })
        },
    },

}