export default [
	{
		path: '/row-templates',
		component: global.loadView('pages/Index'),
		props: { index: 'row-templates' }
	},
	{
		path: '/row-template',
		component: global.loadView('routed/Propview'),
		children: [
			{
				name: 'row-template',
				path: ':id',
				components: {
					leftMenu:       global.loadView('menus/row/DeviceSizes'),
					leftContent:    global.loadView('pages/builder/RowTemplate'),
					rightMenu:      global.loadView('menus/row/RowSave'),
					rightContent:   global.loadView('menus/row/RowProperties')
				}
			}
		]
	},
	{
		path: '/row-builders',
		component: global.loadView('pages/Index'),
		props: { index: 'row-templates' }
	},
	{
		path: '/row-builder',
		component: global.loadView('routed/DragDrop'),
		children: [
			{
				name: 'row-builder',
				path: ':id',
				components: {
					leftMenu:       global.loadView('menus/row/RowTabs'),
					leftContent:    global.loadView('menus/row/RowLegenda'),
					centerMenu:     global.loadView('menus/row/RowSave'),
					centerContent:  global.loadView('pages/builder/RowBuilder'),
					rightMenu:      global.loadView('menus/row/RowSave'),
					rightContent:   global.loadView('menus/row/RowProperties')
				}
			}
		]
	}
]