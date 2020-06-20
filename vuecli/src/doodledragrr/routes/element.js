export default [
	{
		name: 'element-builders',
		path: '/element-builders',
		component: global.loadDrag('index/BuilderIndex'),
		meta:  { title: 'Elements | Dragrr' },
		props: { index: 'element-templates' }
	},
	{
		path: '/element-builder',
		component: global.loadDrag('routed/Propview'),
		meta:  { title: 'Element Builder | Dragrr' },
		props: { source: 'element' },
		children: [
			{
				name: 'element-builder',
				path: ':id',
				components: {
					leftMenu:       global.loadDrag('builders/IndexReturn'),
					leftContent:    global.loadDrag('builders/ElementBuilder'),
					rightContent:   global.loadDrag('builders/ElementProperties'),
					rightMenu:      global.loadDrag('builders/SharedSave'),
				}
			}
		]
	},

]