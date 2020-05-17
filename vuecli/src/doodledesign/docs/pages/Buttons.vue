<template>
	<div class="container">
		<div class="title bigger">Basic Elements</div>
		<div class="title big">Buttons</div>
		<div class="title">Pick your style</div>
		<div class="flex-80">
			<od-button                   > Default   </od-button>
			<od-button class="round"     > Round     </od-button>
			<od-button class="simple"    > Simple    </od-button>
			<od-button class="icon"      icons="hart" />
			<od-button class="left-icon" icons="hart"> Left-icon </od-button>
			<od-button class="close"     icons="x">  </od-button>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-button                 /*) Default   (*/od-button*)
				(*od-button class="round"   /*) Round     (*/od-button*)
				(*od-button class="simple"  /*) Simple    (*/od-button*)
				(*od-button class="icon"      icons="hart"/*)
				(*od-button class="left-icon" icons="hart" *) Left-icon (*/od-button*)
				(*od-button class="close"     icons="x"/*)
			</pre>
		</od-codeview>
		<div class="title">Pick your size</div>
		<div class="flex-80">
			<od-button class="smaller" > Smaller </od-button>
			<od-button                 > Regular </od-button>
			<od-button class="bigger"  > Bigger  </od-button>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-button class="smaller"*) Smaller  (*/od-button*)
				(*od-button                *) Regular  (*/od-button*)
				(*od-button class="bigger" *) Bigger   (*/od-button*)
			</pre>
		</od-codeview>
		<div class="title">Pick your color</div>
		<div class="flex-80">
			<od-button class="brand"   > Brand  </od-button>
			<od-button class="cancel"  > Cancel </od-button>
			<od-button class="second"  > Second </od-button>
			<od-button class="action"  > Action </od-button>
			<od-button class="danger"  > Danger </od-button>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-button class="brand" *) Brand  (*/od-button*)
				(*od-button class="cancel"*) Cancel (*/od-button*)
				(*od-button class="second"*) Second (*/od-button*)
				(*od-button class="action"*) Action (*/od-button*)
				(*od-button class="danger"*) Danger (*/od-button*)
			</pre>
		</od-codeview>
		<div class="title">Pick your function</div>
		<div class="flex-80">
			<od-button disabled         > Disabled </od-button>
			<od-button                  > Click  </od-button>
			<od-button function="toggle"> Toggle </od-button>
			<od-dropdown class="action" label="Dropdown">
				 <a>Cras justo odio</a>
                 <a>Dapibus ac facilisis in</a>
                 <a>Morbi leo risus</a>
                 <a>Porta ac consectetur ac</a>
			</od-dropdown>
			<od-button function="toggle" class="second left-icon" icons="x,ok"> Toggle </od-button>
			<od-button function="toggle" class="action" vmodel="toggleVar" > vModel </od-button>
			<od-button function="toggle" class="action" smodel="demoname"  > sModel </od-button>
		</div>
		<div class="flex-80">
			<od-switch vmodel="toggleVar"> model in parent component </od-switch>
			<od-switch smodel="demoname" > model in store</od-switch>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-button*) Click  (*/od-button*)
				(*od-button function="toggle"*) Toggle (*/od-button*)
				(*od-button function="toggle" class="second left-icon" icons="x,ok"*) Toggle (*/od-button*)
				(*od-dropdown class="action" label="Dropdown"*)
					(*a*)Cras justo odio(*/a*)
					(*a*)Dapibus ac facilisis in(*/a*)
				(*/od-dropdown*)
			    (*od-button function="toggle" class="action" vmodel="toggleVar" *) vModel (*/od-button*)
			    (*od-button function="toggle" class="action" smodel="storename" *) sModel (*/od-button*)
			    (*od-switch vmodel="toggleVar"*) model in parent component (*/od-switch*)
				(*od-switch smodel="storename"*) model in store(*/od-switch*)
				(*script*)
					data(){
						return {
							toggleVar: false,
						}
					},
					computed:{
						storename(){
							return this.$store.getters['doodlegui/getToggleState']('storename')
						}
					},
				(*/script*)
			</pre>
		</od-codeview>

		<div class="title">Link</div>
		<div class="flex-80">
			<div class="od-radiorow">
				<od-link route="inputs"> Inputs  </od-link>
				<od-link class="action" path="doodledesign/badges"> Badges  </od-link>
				<od-link class="left-icon" icons="hart" path="//admin/doodledesign/panels"> Panels  </od-link>
			</div>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-link route="input"> Inputs  (*/od-link*)
				(*od-link path="doodledesign/badges"> Badges  (*/od-link*)
				(*od-link class="simple" path="//admin/doodledesign/panels"*) Panels  (*/od-link*)
			</pre>
		</od-codeview>

		<div class="title">Radio buttons</div>
		<div class="flex-80">
			<div class="od-radiorow">
				<od-radiobutton vmodel="radioVar" value="option1"> Option 1 </od-radiobutton>
				<od-radiobutton vmodel="radioVar" value="option2"> Option 2 </od-radiobutton>
				<od-radiobutton vmodel="radioVar" value="option3" class="action left-icon" icons="x,ok" > Option 3 </od-radiobutton>
			</div>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*div class="od-radiorow"*)
					(*od-radiobutton vmodel="radioVar" value="option1"*) Option 1 (*/od-radiobutton*)
					(*od-radiobutton vmodel="radioVar" value="option2"*) Option 2 (*/od-radiobutton*)
					(*od-radiobutton vmodel="radioVar" value="option3" class="action left-icon" icons="x,ok"*) Option 3 (*/od-radiobutton*)
				(*/div*)
			</pre>
		</od-codeview>
	</div>

</template>

<script>

export default {
	name: 'buttons',
	data(){
		return {
			toggleVar: false,
			radioVar:  'option2',
		}
	},
	computed:{
		demoname(){
			return this.$store.getters['doodlegui/getToggleState']('demoname')
		}
	},
	methods:{
	}

}
</script>
