import Vue       from 'vue'
import Vuex      from 'vuex'
import DragrrApi from '../packages/dragrr'

Vue.use(Vuex)

export default {

    namespaced: true,

    state: {
        mainIndex:   true,

        apis: {
            dragrrApi: new DragrrApi(),
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
            context.state.apis.dragrrApi.getRowTemplates()
                .then( result => {
                    context.commit('setRowTemplates', result )
                })
        },
    },

}