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
		component: global.loadDrag('routed/DragDropview'),
		meta:  { title: 'Widget Builder | Dragrr' },
		props: { source: 'widget' },
		children: [
			{
				name: 'widget-builder',
				path: ':id',
				components: {
					leftMenu:       global.loadDrag('builders/IndexReturn'),
					centerMenu:     global.loadDrag('builders/PreviewView'),
					rightMenu:      global.loadDrag('builders/SharedSave'),
					leftContent:    global.loadDrag('builders/widget/WidgetDrag'),
					centerContent:  global.loadDrag('builders/widget/WidgetDropzone'),
					rightContent:   global.loadDrag('builders/widget/WidgetProperties'),
				}
			}
		]
	},

]