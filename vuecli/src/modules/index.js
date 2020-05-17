import Vue       from 'vue'
import Vuex      from 'vuex'
import doodleApi from '@/packages/doodle'

Vue.use(Vuex)

export default {
    namespaced: true,

    state: {
        mainIndex:   true,

        apis: {
            doodleApi: new doodleApi(),
        },

        connections: null,
        differences: null,

    },

    getters: {

        connections: (state) => { return state.connections },
        differences: (state) => { return state.differences },

    },

    mutations: {

        setConnections(state, connections){ state.connections = connections },
        setDifferences(state, differences){ state.differences = differences },

    },

    actions: {

        setCredentials(context, params) {
            context.state.params = params
            context.state.apis.doodleApi.setCredentials(params.client, params.project)
        },

        getConnections(context, type){
            context.state.apis.doodleApi.getConnections()
                .then( result => {
                    context.commit('setConnections', result )
                })
        },
        getDifferences(context, type){
            context.state.apis.doodleApi.getDifferences()
                .then( result => {
                    context.commit('setDifferences', result )
                })
        },
    },


}