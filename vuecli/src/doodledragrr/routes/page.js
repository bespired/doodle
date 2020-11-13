export default [
    {
        name: 'page-builders',
        path: '/page-builders',
        component: global.loadDrag('index/BuilderIndex'),
        meta:  { title: 'pages | Dragrr' },
        props: { index: 'page-templates' }
    },
    {
        path: '/page-builder',
        component: global.loadDrag('routed/Propview'),
        meta:  { title: 'Page Builder | Dragrr' },
        props: { source: 'page' },
        children: [
            {
                name: 'page-builder',
                path: ':id',
                components: {
                    leftMenu:       global.loadDrag('builders/DeviceSizesIndex'),
                    leftContent:    global.loadDrag('builders/PageBuilder'),
                    rightContent:   global.loadDrag('builders/PageProperties'),
                    rightMenu:      global.loadDrag('builders/SharedSave'),
                }
            }
        ]
    },

    {
        name: 'page-contents',
        path: '/page-contents',
        component: global.loadDrag('index/BuilderIndex'),
        meta:  { title: 'pages | Dragrr' },
        props: { index: 'page-templates' }
    },
    {
        path: '/page-content',
        component: global.loadDrag('routed/Splitview'),
        meta:  { title: 'Page Content | Dragrr' },
        props: { source: 'page' },
        children: [
            {
                name: 'page-content',
                path: ':id',
                components: {
                    leftMenu:       global.loadDrag('builders/DeviceSizesIndex'),
                    rightMenu:      global.loadDrag('builders/SharedSave'),
                    leftContent:    global.loadDrag('selectors/PageContent'),
                    rightContent:   global.loadDrag('selectors/PageContentProperties'),
                }
            }
        ]
    },

]