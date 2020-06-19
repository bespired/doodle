export default [
	{
		name: 'section-builders',
		path: '/section-builders',
		component: global.loadDrag('index/BuilderIndex'),
		meta:  { title: 'Sections | Dragrr' },
		props: { index: 'section-templates' }
	},
	{
		path: '/section-builder',
		component: global.loadDrag('routed/Propview'),
		meta:  { title: 'Section Builder | Dragrr' },
		props: { source: 'section' },
		children: [
			{
				name: 'section-builder',
				path: ':id',
				components: {
					leftMenu:       global.loadDrag('menus/shared/DeviceSizes'),
					leftContent:    global.loadDrag('builders/SectionBuilder'),
					rightContent:   global.loadDrag('builders/SectionProperties'),
					rightMenu:      global.loadDrag('menus/shared/SharedSave'),
				}
			}
		]
	},

]