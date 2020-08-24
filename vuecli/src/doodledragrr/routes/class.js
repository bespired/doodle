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
                path: 'font/:id',
                name: 'font-class-builder',
                meta:  { title: 'Font Class Builder | Dragrr', area: 'fonts' },
                components: {
                    leftMenu:       global.loadDrag('builders/DeviceSizesIndex'),
                    leftContent:    global.loadDrag('builders/classbuilders/FontBuilder'),
                    rightContent:   global.loadDrag('builders/classbuilders/FontProperties'),
                    rightMenu:      global.loadDrag('builders/SharedSave'),
                }
            },
            {
                path: 'color/:id',
                name: 'color-class-builder',
                meta:  { title: 'Color Class Builder | Dragrr', area: 'colors' },
                components: {
                    leftMenu:       global.loadDrag('builders/DeviceSizesIndex'),
                    leftContent:    global.loadDrag('builders/classbuilders/ColorBuilder'),
                    rightContent:   global.loadDrag('builders/classbuilders/ColorProperties'),
                    rightMenu:      global.loadDrag('builders/SharedSave'),
                }
            },
        ]
    },

]