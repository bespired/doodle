<template>
    <header id="appheader" class="appheader" >
        <doodle-logo class="appheader-logo" />
        <div class="flex" v-if="tenant">
			<od-dropdown class="tentant" :label="tenant.project" sublabel="" >
				<template v-for="entry in tenant.menulist">
					<a :key="entry.id">{{ entry.label }}</a>
				</template>
			</od-dropdown>
		</div>
		<div class="flex">
			<template v-for="dropdown in main">
				<od-dropdown :label="dropdown.label" :key="dropdown.alias">
					<div class="menu-panel" :class="{triple: dropdown.chapters.length > 2}">
						<template v-for="chapter in dropdown.chapters">
							<div class="column" :key="chapter.alias">
								<div class="title">{{ chapter.label }}</div>
								<template v-for="item in chapter.items">
									<a :key="item.alias" :href="item.location">
										{{ item.label }}
									</a>
								</template>
							</div>
						</template>
					</div>
				</od-dropdown>
			</template>
		</div>
		<div class="flex push-right" v-if="profile">
			<od-dropdown class="pop-right" :label="user.fullname">
				<template v-for="entry in profile">
					<a :key="entry.id">{{ entry.label }}</a>
				</template>
			</od-dropdown>
		</div>
    </header>
</template>

<script>

import Storage from '../../helpers/storage.js'
import Vue from 'vue'

export default {
    name: 'app-header',

    data(){
    	return{
    		tenant:  Storage.get('tenantmenu', {}),
    		user:    Storage.get('usermenu', { fullname:'' }),
    		profile: Storage.get('profilemenu',[]),
    		main:    Storage.get('mainmenu', []),
    	}
    },

    mounted() {
        this.loadMenu('tenantmenu')
		this.loadMenu('usermenu')
		this.loadMenu('profilemenu')
		this.loadMenu('mainmenu')
    },

    methods: {
    	loadMenu(item){
			const url = `${window.location.protocol}//${window.location.hostname}/api/${item}`
        	axios.get(url)
            	.then(response => {
            		const varname= item.replace(/menu/, '')
            		this[varname] = response.data
            		Storage.set(item, response.data);
            	})
            	.catch( error => error )
    	}
    }
}
</script>