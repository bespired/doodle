export default [

	{
		path: '/layout-builders',
		component: global.loadDrag('index/BuilderIndex'),
		meta:  { title: 'Layouts | Dragrr' },
		props: { index: 'layout-templates' }
	},
	{
		path: '/layout-builder',
		component: global.loadDrag('routed/Propview'),
		meta: { title: 'Layout Builder | Dragrr' },
		children: [
			{
				name: 'layout-builder',
				path: ':id',
				components: {
					leftMenu:       global.loadDrag('menus/shared/DeviceSizes'),
					leftContent:    global.loadDrag('builders/RowTemplate'),
					rightMenu:      global.loadDrag('menus/shared/SharedSave'),
					rightContent:   global.loadDrag('menus/layout/LayoutProperties')
				}
			}
		]
	},

]