import Vue  from 'vue';
import Vuex from 'vuex';

import moduleBase   from '@/modules/base';
import modulePusher from '@/modules/pusher';
import moduleDoodle from './doodledesign/modules/moduleDoodle';
import moduleDragrr from './doodledragrr/modules/moduleDragrr';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        base:      moduleBase,
        pusher:    modulePusher,
        doodlegui: moduleDoodle, // stupid that this can't be in doodledesign-- is for vue inspect
        dragrr:    moduleDragrr, // stupid that this can't be in doodledragrr-- is for vue inspect
    },
});