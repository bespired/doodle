<template>
	<div class="container">
		<div class="title bigger">Header Elements</div>
		<div class="title big">App header</div>
		<od-codeview :openbutton="true" >
			<pre>
			(*header id="appheader" class="appheader"*)
				(*doodle-logo class="appheader-logo"/*)
				(*div class="flex"*)
					(*od-dropdown class="tentant" :label="tenant.project" :sublabel="tenant.client"*)
						(*template v-for="entry in tenant.menulist"*)
							(*a :key="entry.id"*)({ entry.project })(*/a*)
						(*/template*)
					(*/od-dropdown*)
				(*/div*)
				(*div class="flex"*)
					(*template v-for="dropdown in menu"*)
						(*od-dropdown :label="dropdown.label" :key="dropdown.alias"*)
							(*div class="menu-panel" :class="{triple: dropdown.chapters.length *) 2}"*)
								(*template v-for="chapter in dropdown.chapters"*)
									(*div class="column" :key="chapter.alias"*)
										(*div class="title"*)({ chapter.label })(*/div*)
										(*template v-for="item in chapter.items"*)
											(*a :key="item.alias"*)({ item.label })(*/a*)
										(*/template*)
									(*/div*)
								(*/template*)
							(*/div*)
						(*/od-dropdown*)
					(*/template*)
				(*/div*)
				(*div class="flex push-right"*)
					(*od-dropdown class="pop-right" :label="user.fullname"*)
						(*template v-for="entry in profile"*)
							(*a :key="entry.id"*)({ entry.label })(*/a*)
						(*/template*)
					(*/od-dropdown*)
				(*/div*)
			(*/header*)
			</pre>
		</od-codeview>

		<div class="title big">Buttons</div>

		<div class="title">Pick your size</div>
		<div class="od-window-header for-overview">
			<od-button class="square" > Sq </od-button>
			<od-button class="double" > Double </od-button>
		</div>
		<od-codeview :openbutton="true" >
			<pre>
			(*div class="od-window-header"*)
				(*od-button class="square" *) Sq (*/od-button*)
				(*od-button class="double" *) Double (*/od-button*)
			(*/div*)
			</pre>
		</od-codeview>
		<div class="title">Pick a side</div>
		<div class="od-window-header for-overview">
			<od-button > Left </od-button>
			<od-button class="square"> 2 </od-button>
			<od-button class="push-middle"> Push Middle </od-button>
			<od-button class="square"> 2 </od-button>
			<od-button class="square"> 3 </od-button>
			<od-button class="push-right"> Push Right </od-button>
			<od-button class="off"></od-button>
		</div>
		<od-codeview :openbutton="true" :overlap="true" > 
			<pre>
			(*div class="od-window-header"*)
				(*od-button*) Left (*/od-button*)
				(*od-button class="square"*) 2 (*/od-button*)
				(*od-button class="push-middle"*) Push Middle (*/od-button*)
				(*od-button class="square"*) 2 (*/od-button*)
				(*od-button class="square"*) 3 (*/od-button*)
				(*od-button class="push-right"*) Push Right (*/od-button*)
				(*od-button*) End (*/od-button*)
			(*/div*)
			</pre>
		</od-codeview>
		<div class="title">Pick a function</div>
		<div class="od-window-header for-overview">
			<od-dropdown class="action" label="Dropdown">
				 <a>Cras justo odio</a>
				 <a>Dapibus ac facilisis in</a>
				 <a>Morbi leo risus</a>
				 <a>Porta ac consectetur ac</a>
			</od-dropdown>
			<od-button function="radio" vmodel="radioname" value="option1" icons="ok"     class="push-middle square"/>
			<od-button function="radio" vmodel="radioname" value="option2" icons="x"      class="square danger"/>
			<od-button function="radio" vmodel="radioname" value="option3" icons="hart"   class="square"/>
			<od-button class="">Radio</od-button>
			<od-button class="push-right none"></od-button>
		</div>
		<od-codeview :openbutton="true" > 
			<pre>
			(*div class="od-window-header"*)
				(*od-dropdown class="action" label="Dropdown"*)
					 (*a*)Cras justo odio(*/a*)
					 (*a*)Dapibus ac facilisis in(*/a*)
					 (*a*)Morbi leo risus(*/a*)
				(*/od-dropdown>
				(*od-button function="radio" vmodel="radioname" value="option1" icons="ok"     class="push-middle square"/*)
				(*od-button function="radio" vmodel="radioname" value="option2" icons="x"      class="square danger"/*)
				(*od-button function="radio" vmodel="radioname" value="option3" icons="hart"   class="square"/*)
			(*/div*)
			</pre>
		</od-codeview>


		<div class="title big">Input</div>

		<div class="title">text</div>
		<div class="od-window-header for-overview">
			<od-button class="" > Input </od-button>
		</div>
		<od-codeview :openbutton="true" >
			<pre>
			(*div class="od-window-header"*)
				(*od-button class="square" *) Sq (*/od-button*)
				(*od-button class="double" *) Double (*/od-button*)
			(*/div*)
			</pre>
		</od-codeview>

		<div class="title big">Tabs</div>
		<od-tabmenu vmodel="tab" :tabs="tabmenu" />
		<od-codeview :openbutton="true" > 
			<pre>
				(*od-tabmenu vmodel="tab" :tabs="tabmenu"/*)
				(*script*)
					data(){
						return {
							tab: null,
							tabmenu: ['Tab 1','Tab 2','Tab 3'],
							// or tabmenu: { tab1: 'Tab 1',  tab2: 'Tab 2' }
						}
					},
				(*/script*)
			</pre>
		</od-codeview>
	</div>

</template>

<script>

export default {
	name: 'headers',
	data(){
		return {
			tab: null,
			tabmenu: ['Tab 1','Tab 2','Tab 3'],
			radioname: 'option2',
		}
	},
	methods:{
	}
}
</script>
