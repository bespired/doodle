export default [
    // {
    //     name: 'class-builders',
    //     path: '/class-builders',
    //     component: global.loadDrag('index/ClassesOverview'),
    //     meta:  { title: 'Classes | Dragrr' },
    //     props: { index: 'class-templates' }
    // },
    {
        path: '/class-builders/:area',
        component: global.loadDrag('index/BuilderIndex'),
        meta:  { title: 'Class Builder | Dragrr' },
        props: { source: 'class', index: 'class-templates' },
    },
    {
        path: '/class-builder',
        component: global.loadDrag('routed/Propview'),
        meta:  { title: 'Class Builder | Dragrr' },
        props: { source: 'class' },
        children: [
            {
                name: 'class-builder-item',
                path: ':area/:id',
                components: {
                    leftMenu:       global.loadDrag('builders/DeviceSizesIndex'),
                    leftContent:    global.loadDrag('builders/ClassBuilder'),
                    rightContent:   global.loadDrag('builders/ClassProperties'),
                    rightMenu:      global.loadDrag('builders/SharedSave'),
                }
            }
        ]
    },

]