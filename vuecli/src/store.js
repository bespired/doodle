import Vue  from 'vue';
import Vuex from 'vuex';
import moduleBase   from '@/modules/base';
import moduleIndex  from '@/modules/index';
import modulePusher from '@/modules/pusher';

import moduleDoodle from './doodledesign/modules/moduleDoodle';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        base:      moduleBase,
        index:     moduleIndex,
        pusher:    modulePusher,
        doodlegui: moduleDoodle, // stupid -- is for vue inspect
    },
});