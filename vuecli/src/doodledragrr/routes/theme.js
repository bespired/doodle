export default [
	{
		name: 'theme-builders',
		path: '/theme-builders',
		component: global.loadDrag('index/BuilderIndex'),
		meta:  { title: 'Themes | Dragrr' },
		props: { index: 'theme-templates' }
	},
	{
		path: '/theme-builder',
		component: global.loadDrag('routed/Propview'),
		meta:  { title: 'Theme Builder | Dragrr' },
		props: { source: 'theme' },
		children: [
			{
				name: 'theme-builder',
				path: ':id',
				components: {
					leftMenu:       global.loadDrag('builders/DeviceSizesIndex'),
					leftContent:    global.loadDrag('builders/ThemeBuilder'),
					rightContent:   global.loadDrag('builders/ThemeProperties'),
					rightMenu:      global.loadDrag('builders/SharedSave'),
				}
			}
		]
	},

]