export default [
	{
		name: 'layout-builders',
		path: '/layout-builders',
		component: global.loadDrag('index/BuilderIndex'),
		meta:  { title: 'Layouts | Dragrr' },
		props: { index: 'layout-templates' }
	},
	{
		path: '/layout-builder',
		component: global.loadDrag('routed/Propview'),
		meta:  { title: 'Layout Builder | Dragrr' },
		props: { source: 'layout' },
		children: [
			{
				name: 'layout-builder',
				path: ':id',
				components: {
					leftMenu:       global.loadDrag('builders/DeviceSizesIndex'),
					leftContent:    global.loadDrag('builders/LayoutBuilder'),
					rightContent:   global.loadDrag('builders/LayoutProperties'),
					rightMenu:      global.loadDrag('builders/SharedSave'),
				}
			}
		]
	},

]