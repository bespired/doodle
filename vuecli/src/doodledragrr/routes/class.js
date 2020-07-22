export default [
    {
        name: 'class-builders',
        path: '/class-builders',
        component: global.loadDrag('index/BuilderIndex'),
        meta:  { title: 'Class | Dragrr' },
        props: { index: 'class-templates' }
    },
    {
        path: '/class-builder',
        component: global.loadDrag('routed/Propview'),
        meta:  { title: 'Class Builder | Dragrr' },
        props: { source: 'class' },
        children: [
            {
                name: 'class-builder',
                path: ':id',
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