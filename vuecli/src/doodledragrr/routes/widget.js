export default [
	{
		name: 'widget-builders',
		path: '/widget-builders',
		component: global.loadDrag('index/BuilderIndex'),
		meta:  { title: 'Widgets | Dragrr' },
		props: { index: 'widget-templates' }
	},
	{
		path: '/widget-builder',
		component: global.loadDrag('routed/Propview'),
		meta:  { title: 'Widget Builder | Dragrr' },
		props: { source: 'widget' },
		children: [
			{
				name: 'widget-builder',
				path: ':id',
				components: {
					leftMenu:       global.loadDrag('builders/DeviceSizes'),
					leftContent:    global.loadDrag('builders/WidgetBuilder'),
					rightContent:   global.loadDrag('builders/WidgetProperties'),
					rightMenu:      global.loadDrag('builders/SharedSave'),
				}
			}
		]
	},

]