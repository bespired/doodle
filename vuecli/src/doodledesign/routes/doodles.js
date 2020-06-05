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
                meta:{ title: 'Doodle' },
                components: {
                    // default: global.loadView('routed/Empty'),
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Buttons')
                }
            },{
                name: 'headers',
                path: 'headers',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Headers')
                }
            },{
                name: 'inputs',
                path: 'inputs',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Inputs')
                }
            },{
                name: 'selects',
                path: 'selects',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Selects')
                }
            },{
                name: 'icons',
                path: 'icons',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Icons')
                }
            },{
                name: 'panels',
                path: 'panels',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Panels')
                }
            },{
                name: 'lists',
                path: 'lists',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Lists')
                }
            },{
                name: 'badges',
                path: 'badges',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Badges')
                }
            },{
                name: 'switches',
                path: 'switches',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Switches')
                }
            },{
                name: 'alerts',
                path: 'alerts',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Alerts')
                }
            },{
                name: 'layouts',
                path: 'layouts',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Layouts')
                }
            },{
                name: 'tools',
                path: 'tools',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Tools')
                }
            },{
                name: 'install',
                path: 'install',
                meta:{ title: 'Doodle' },
                components: {
                    leftContent:   global.loadDoc('views/Legenda'),
                    rightContent:  global.loadDoc('pages/Install')
                }
            },

        ]
    }

]