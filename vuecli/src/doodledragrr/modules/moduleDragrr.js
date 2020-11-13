import Vue       from 'vue'
import Vuex      from 'vuex'
import DragrrApi from '../packages/dragrr'
import PageLoad  from '../packages/pageload'

Vue.use(Vuex)

import Helpers   from '../../helpers.js'

export default {

    namespaced: true,

    state: {
        mainDragrr: true,

        pageLoad: new PageLoad(),

        apis: {
            dragrrApi: new DragrrApi(),
        },

        classTemplates:    null,
        classTemplateId:   null,
        // or
        // classTemplates:  { fonts: null, sizes: null, borders: null },
        // classTemplateId: { fonts: null, sizes: null, borders: null },

        elementTemplates:  null,
        elementTemplateId: null,

        layoutTemplates:   null,
        layoutTemplateId:  null,

        sectionTemplates:  null,
        sectionTemplateId: null,

        themeTemplates:    null,
        themeTemplateId:   null,

        widgetTemplates:   null,
        widgetTemplateId:  null,

        pageTemplates:     null,
        pageTemplateId:    null,

        currentTemplate:   null,

        htmlPage:          null,
        dsonPage:          null,
        dsonStub:          null,
        dsonSchema:        null,

        settings:          {},
        dragging:          null,

        elements: {
            text:     { attrib: "", input: "text",     label: "", width: 100 },
            markdown: { attrib: "", input: "markdown", label: "", width: 100 },
            image:    { attrib: "", input: "image",    label: "", width: 100 },
            button:   { attrib: "", input: "button",   label: "", width: 100 },
        },

    },


    getters: {

        getClassTemplates:   (state) => { return state.classTemplates   },
        getPageTemplates:    (state) => { return state.pageTemplates    },
        getElementTemplates: (state) => { return state.elementTemplates },
        getLayoutTemplates:  (state) => { return state.layoutTemplates  },
        getSectionTemplates: (state) => { return state.sectionTemplates },
        getThemeTemplates:   (state) => { return state.themeTemplates   },
        getWidgetTemplates:  (state) => { return state.widgetTemplates  },
        getHtmlPage:         (state) => { return state.htmlPage         },
        getDsonPage:         (state) => { return state.dsonPage         },
        getDsonStub:         (state) => { return state.dsonStub         },
        getDsonSchema:       (state) => { return state.dsonSchema       },
        getDragging:         (state) => { return state.dragging         },
        getElements:         (state) => { return state.elements         },
        currentTemplate:     (state) => {
            if ( state.currentTemplate  === null ) return null
            if ( state.currentTemplate.error !== undefined ) {
                console.error( state.currentTemplate.error ); return null;
            }
            return state.currentTemplate
        },


        getSetting:  (state) => name =>{
            if ( state.settings[name] === null ) return null
            return state.settings[name]
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
        setSetting(state, payload)  {
            Vue.set(state.settings, payload.source, payload.items)
        },
        setDragging(state, value) {
            console.log('setDragging(state, value)' , value)
            state.dragging = value
        },
        swapDropped(state, payload)  {
            // find the damn thing in the DOM for g*d sake.
            let idx = 0, found = null, atIdx = null
            payload.to.children.forEach((child) => {
                if ( child.classList, child.classList.contains('select') ) {
                    found = child
                    atIdx = idx
                }
                idx++
            })

            const rowId = payload.to.dataset.row
            const elemName = `.dropzone [data-type="${found.dataset.type}"]`

            let elm = document.querySelector(elemName)
            if (elm){
                // only change if found
                elm.remove()

                // splice the type on the right spot...
                let handle = state.currentTemplate.elements[rowId]
                handle.splice( atIdx, 0, state.elements[found.dataset.type])

                // adjust the widths...
                handle.forEach((e) => {
                    let w = handle.length === 3 ? 33 : 100 / handle.length
                    e.width = Math.floor(w)
                })
            }

        },
        // General for Layout and Section and ...
        setTemplates(state, payload)  {
            state[`${payload.source}Templates`] = payload.templates
        },
        addTemplate(state, payload)    {
            const stateTemplates = `${payload.source}Templates`
            state[stateTemplates].push(payload.template)
        },
        removeTemplates(state, payload){
            const stateTemplates = `${payload.source}Templates`
            payload.removedHandles.forEach((h)=>{
                state[stateTemplates].forEach((t, i)=>{
                    if ( t.handle === h )  {
                        state[stateTemplates].splice(i, 1)
                    }
                })
            })
        },
        setHtmlPage(state, html) {
            state.htmlPage = state.pageLoad.fixHtml(html)
        },
        setDsonPage(state, dson) {
            state.dsonPage = dson
        },
        setDsonStub(state, dson) {
            state.dsonStub = dson
        },
        setDsonSchema(state, schema) {
            state.dsonSchema = schema
        },

        // Current
        touchCurrentTemplate(state) { state.currentTemplate.updated_at = new Date() },
        clearCurrentTemplate(state) { state.currentTemplate = null },
        setCurrentTemplate(state, payload) {
            const stateTemplates = `${payload.source}Templates`
            const handle         = payload.handle
            const templates      = state[stateTemplates]

            state.currentTemplate = null;
            if ( templates === null ) return

            const result = templates.filter(template => template.handle === handle)
            state.currentTemplate = result.length ? result[0] : { error: 'cannot find template handle.' }
        },

    },

    actions: {

        getSettings(context, payload){
            const source = payload.source
            let   force  = payload.force
            if ( context.state.settings[source] === undefined  ) force = true
            if ( context.state.settings[source] === null  ) force = true

            if ( force ){
                context.state.apis.dragrrApi.getSettings(source)
                .then( result => {
                    context.commit('setSetting', { source: source, items: result })
                })
            }
        },

        getTemplatedTemplates(context, payload){
            const source    = payload.source
            const stateName = `${payload.source}Templates`
            const stateId   = `${payload.source}TemplateId`

            if ( payload.force || context.state[stateName] === null ){
                context.state.apis.dragrrApi.getTemplates(source)
                .then( result => {
                    context.commit('setTemplates', { source: source, templates: result })

                    if (context.state[stateId]){
                        context.commit('setCurrentTemplate', { source: source, handle: context.state[stateId] })
                        context.state[stateId] = null
                    }

                })
            }
        },

        setCurrentTemplate(context, payload){
            const handle    = payload.handle
            const source    = payload.source
            const stateName = `${payload.source}Templates`
            const stateId   = `${payload.source}TemplateId`
            let templates   = context.state[stateName]
            let templateId  = context.state[stateId]

            // load all referenced templates...
            if (( source === 'section' ) && ( context.state.layoutTemplates === null ))
                context.dispatch('getTemplatedTemplates', { source: 'layout', force: true })

            if (( source === 'widget' ) && ( context.state.elementTemplates === null ))
                context.dispatch('getTemplatedTemplates', { source: 'element', force: true })

            if (templates === null) {
                if (handle) context.state[stateId] = handle
                context.dispatch('getTemplatedTemplates', {
                    source: source,
                    force : true
                })
                return

            }else{

                context.commit('setCurrentTemplate', payload)

            }

        },

        exportTemplates(context, payload){
            context.state.apis.dragrrApi.exportTemplates(payload.source, payload.handles)
            .then( response => {
                let filename = response.request.getResponseHeader('X-Filename')
                context.commit('doodlegui/saveToDesktop', {
                    filename: filename ? filename : 'download.yaml',
                    data    : response.data
                }, { root:true })
                context.commit('doodlegui/clearIndexSelected', null, {root:true})
            })
        },

        deleteTemplates(context, payload){
            context.commit('removeTemplates', {
                source: payload.source,
                removedHandles: payload.handles
            })
            context.state.apis.dragrrApi.deleteTemplates(payload.source, payload.handles)
            .then( result => {
                context.commit('doodlegui/clearIndexSelected', null, {root:true})
                context.dispatch('doodlegui/addNamedAlertPanel', 'deleted', {root:true})
            })
            .catch( cancel => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'no-delete', {root:true})
            })
        },

        duplicateTemplates(context, payload){
            context.state.apis.dragrrApi.duplicateTemplates(payload.source, payload.handles)
            .then( result => {
                context.commit('doodlegui/clearIndexSelected', null, {root:true})
                context.dispatch('getTemplatedTemplates', { source: payload.source, force: true })
                context.dispatch('doodlegui/addNamedAlertPanel', 'duplicated', {root:true})
            })
            .catch( cancel => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'error', {root:true})
            })
        },

        createTemplate(context, payload){
            context.state.apis.dragrrApi.createTemplate(payload.source)
            .then( result => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'created', {root:true})
                context.commit('addTemplate', {
                    source: payload.source,
                    template: result.data
                })
            })
        },

        saveCurrentTemplate(context, payload){
            context.state.apis.dragrrApi.saveTemplates(payload.source, context.state.currentTemplate)
            .then( result => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'saved', {root:true})
            })
            .catch( cancel => {
                context.dispatch('doodlegui/addNamedAlertPanel', 'error', {root:true})
            })
        },

        loadOtml(context, pathslug) {
            context.state.apis.dragrrApi.loadOtml(pathslug)
                .then(  result => { context.commit('setHtmlPage', result); })
                .catch( cancel => { context.dispatch('doodlegui/addNamedAlertPanel', 'error', {root:true}) })
        },

        loadDson(context, payload) {
             if (payload.type === 'page') {
                context.state.apis.dragrrApi.loadDson(payload.name, payload.language)
                    .then(  result => { context.commit('setDsonPage', result); })
                    .catch( cancel => { context.dispatch('doodlegui/addNamedAlertPanel', 'error', {root:true}) })
            }else{

                context.state.apis.dragrrApi.loadDson(payload.name, payload.language)
                    .then(  result => { context.commit('setDsonStub', result); })
                    .catch( cancel => { context.dispatch('doodlegui/addNamedAlertPanel', 'error', {root:true}) })

                context.state.apis.dragrrApi.loadSchema(payload.name, payload.language)
                    .then(  result => { context.commit('setDsonSchema', result); })
                    .catch( cancel => { context.dispatch('doodlegui/addNamedAlertPanel', 'error', {root:true}) })

            }
        },

        loadPage(context, pathslug) {
            context.dispatch('loadOtml', pathslug)
            context.dispatch('loadDson', { name: pathslug, type: 'page' })
        }

    },

}