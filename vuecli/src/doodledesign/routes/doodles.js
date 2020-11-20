export default [
    {
        path: '/doodledesign',
        redirect: '/doodledesign/welcome',
        meta:{ title: 'Doodle' },
        component: global.loadDoc('views/Overview'),
        children: [
            {
                name: 'doodle-design',
                path: 'welcome',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Welcome')
                }
            },{
                name: 'buttons',
                path: 'buttons',
                meta:{ title: 'Doodle Buttons' },
                components: {
                    // default: global.loadView('routed/Empty'),
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Buttons')
                }
            },{
                name: 'headers',
                path: 'headers',
                meta:{ title: 'Doodle Headers' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Headers')
                }
            },{
                name: 'images',
                path: 'images',
                meta:{ title: 'Doodle Images' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Images')
                }
            },{
                name: 'inputs',
                path: 'inputs',
                meta:{ title: 'Doodle Inputs' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Inputs')
                }
            },{
                name: 'selects',
                path: 'selects',
                meta:{ title: 'Doodle Selects' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Selects')
                }
            },{
                name: 'icons',
                path: 'icons',
                meta:{ title: 'Doodle Icons' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Icons')
                }
            },{
                name: 'panels',
                path: 'panels',
                meta:{ title: 'Doodle Panels' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Panels')
                }
            },{
                name: 'accordions',
                path: 'accordions Accordions',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Accordions')
                }
            },{
                name: 'lists',
                path: 'lists',
                meta:{ title: 'Doodle Lists' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Lists')
                }
            },{
                name: 'badges',
                path: 'badges',
                meta:{ title: 'Doodle Badges' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Badges')
                }
            },{
                name: 'switches',
                path: 'switches',
                meta:{ title: 'Doodle Switches' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Switches')
                }
            },{
                name: 'alerts',
                path: 'alerts',
                meta:{ title: 'Doodle Alerts' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Alerts')
                }
            },{
                name: 'layouts',
                path: 'layouts',
                meta:{ title: 'Doodle Layouts' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Layouts')
                }
            },{
                name: 'tools',
                path: 'tools',
                meta:{ title: 'Doodle Tools' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Tools')
                }
            },{
                name: 'install',
                path: 'install',
                meta:{ title: 'Doodle Install' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Install')
                }
            },

        ]
    }

]