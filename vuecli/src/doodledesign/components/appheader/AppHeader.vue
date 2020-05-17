<template>
    <header id="appheader" class="appheader">
        <doodle-logo class="appheader-logo"/>
        <div class="flex">
			<od-dropdown class="tentant" :label="tenant.project" :sublabel="tenant.client">
				<template v-for="entry in tenant.menulist">
					<a :key="entry.id">{{ entry.project }}</a>
				</template>
			</od-dropdown>
		</div>
		<div class="flex">
			<template v-for="dropdown in menu">
				<od-dropdown :label="dropdown.label" :key="dropdown.alias">
					<div class="menu-panel" :class="{triple: dropdown.chapters.length > 2}">
						<template v-for="chapter in dropdown.chapters">
							<div class="column" :key="chapter.alias">
								<div class="title">{{ chapter.label }}</div>
								<template v-for="item in chapter.items">
									<a :key="item.alias">{{ item.label }}</a>
								</template>
							</div>
						</template>
					</div>
				</od-dropdown>
			</template>
		</div>
		<div class="flex push-right">
			<od-dropdown class="pop-right" :label="user.fullname">
				<template v-for="entry in profile">
					<a :key="entry.id">{{ entry.label }}</a>
				</template>
			</od-dropdown>
		</div>
    </header>
</template>

<script>
import Menu from '../../helpers/menu.js'
export default {
    name: 'app-header',
    data(){
    	return{
    		tenant: {
    			client: 'Bespired', project: 'Doodles',
    			menulist:[
	    			{ id: 10001, client_id: 1, project_id: 1, client: 'Bespired', project: 'Doodles'    },
	    			{ id: 20002, client_id: 2, project_id: 2, client: 'Nibe'    , project: 'Aardgasvrij' },
	    			{ id: 50005, client_id: 5, project_id: 5, client: 'Zeroplex', project: 'Zeroplex'    },
	    		]
	    	},
    		user:{
    			fullname: 'Joeri Kassenaar'
    		},
    		profile:[
    			{ label: 'Your Profile', action: '' },
    			{ label: 'Settings',     action: '' },
    			{ label: 'Sign-out',     action: '' },
    		],
    		menu: Menu


    	}
    }
}
</script>