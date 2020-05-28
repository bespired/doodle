export default [
    {
        path: '/page-builder',
        component: global.loadView('routed/DragDrop'),
        children: [
            {
                name: 'page-builder',
                path: ':id',
                components: {
                	leftMenu:      global.loadView('menus/page/PageTabs'),
                	rightMenu:     global.loadView('menus/page/PageSave'),
                    leftContent:   global.loadView('menus/page/WidgetDrag'),
                    rightContent:  global.loadView('pages/builder/PageBuilder')
                }
            }
        ]
    }
]