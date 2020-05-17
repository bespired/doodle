import Vue from 'vue'
import Vuex from 'vuex'
import PusherApi  from '@/packages/pusher'

Vue.use(Vuex)

export default {
    namespaced: true,

    state: {
        pusherIndex: true,
        pusherApi  : new PusherApi(),
        messages   : [],
    },

    getters: {
        messages: (state) => { return state.messages },
    },

    mutations: {
        // message is the event name ...
        message(state, message){ state.messages.push(message) },
    },

    actions: {
        setAppKey(context, params) {
            context.state.pusherApi.addEvent(context, params)
        },
    },

}