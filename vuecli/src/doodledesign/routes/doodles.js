export default [
    {
        path: '/doodledesign',
        redirect: '/doodledesign/welcome',
        component: global.loadDoc('views/Overview'),
        children: [
            {
                name: 'doodle-design',
                path: 'welcome',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Welcome')
                }
            },{
                name: 'buttons',
                path: 'buttons',
                components: {
                    // default: global.loadView('routed/Empty'),
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Buttons')
                }
            },{
                name: 'headers',
                path: 'headers',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Headers')
                }
            },{
                name: 'inputs',
                path: 'inputs',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Inputs')
                }
            },{
                name: 'selects',
                path: 'selects',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Selects')
                }
            },{
                name: 'icons',
                path: 'icons',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Icons')
                }
            },{
                name: 'panels',
                path: 'panels',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Panels')
                }
            },{
                name: 'lists',
                path: 'lists',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Lists')
                }
            },{
                name: 'badges',
                path: 'badges',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Badges')
                }
            },{
                name: 'switches',
                path: 'switches',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Switches')
                }
            },{
                name: 'alerts',
                path: 'alerts',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Alerts')
                }
            },{
                name: 'layouts',
                path: 'layouts',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Layouts')
                }
            },{
                name: 'tools',
                path: 'tools',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Tools')
                }
            },{
                name: 'install',
                path: 'install',
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Install')
                }
            },

        ]
    }

]