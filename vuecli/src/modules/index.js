import Vue       from 'vue'
import Vuex      from 'vuex'
import DoodleApi from '@/packages/doodle'

Vue.use(Vuex)

export default {

    namespaced: true,

    state: {
        mainIndex:   true,

        apis: {
            doodleApi: new DoodleApi(),
        },

        rowTemplates: null,

    },

    getters: {
        getRowTemplates: (state) => { return state.rowTemplates },
    },

    mutations: {
        setRowTemplates(state, rowTemplates){ state.rowTemplates = rowTemplates },
    },

    actions: {
        getRowTemplates(context){
            context.state.apis.doodleApi.getRowTemplates()
                .then( result => {
                    context.commit('setRowTemplates', result )
                })
        },
    },

}