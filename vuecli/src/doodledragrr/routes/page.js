export default [
    {
        path: '/page-builder',
        component: global.loadDrag('routed/DragDrop'),
        meta:{ title: 'Dragrr' },
        children: [
            {
                name: 'page-builder',
                path: ':id',
                meta: { title: 'Dragrr' },
                components: {
                	leftMenu:      global.loadDrag('menus/page/PageTabs'),
                	rightMenu:     global.loadDrag('menus/page/PageSave'),
                    leftContent:   global.loadDrag('menus/page/WidgetDrag'),
                    rightContent:  global.loadDrag('pages/builder/PageBuilder')
                }
            }
        ]
    }
]