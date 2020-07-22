import ClassRoutes   from './class.js'
import ElementRoutes from './element.js'
import LayoutRoutes  from './layout.js'
import PageRoutes    from './page.js'
import SectionRoutes from './section.js'
import ThemeRoutes   from './theme.js'
import WidgetRoutes  from './widget.js'

export default [
	...ClassRoutes,
	...ElementRoutes,
	...LayoutRoutes,
	...PageRoutes,
	...SectionRoutes,
	...ThemeRoutes,
	...WidgetRoutes,
]