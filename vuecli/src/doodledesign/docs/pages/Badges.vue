<template>
	<div class="container">
		<div class="title bigger">Badges</div>
		<div class="title big">Badges</div>
		<div class="title">Pick your style</div>
		<div class="flex-80">
			<od-badge                   > Default   </od-badge>
			<od-badge class="round"     > Round     </od-badge>
			<od-badge class="smaller"   > Smaller   </od-badge>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-badge                 /*) Default   (*/od-badge*)
				(*od-badge class="round"   /*) Round     (*/od-badge*)
				(*od-badge class="smaller" /*) Smaller   (*/od-badge*)
			</pre>
		</od-codeview>
		<div class="title">Pick your color</div>
		<div class="flex-80">
			<od-badge                 > Default </od-badge>
			<od-badge class="brand"   > Brand   </od-badge>
			<od-badge class="cancel"  > Cancel  </od-badge>
			<od-badge class="second"  > Second  </od-badge>
			<od-badge class="warning" > Warning  </od-badge>
			<od-badge class="success" > Success  </od-badge>
			<od-badge class="error"   > Error    </od-badge>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-badge class="brand" *) Brand   (*/od-badge*)
				(*od-badge class="cancel"*) Cancel  (*/od-badge*)
				(*od-badge class="second"*) Second  (*/od-badge*)
				(*od-badge class="action"*) Warning (*/od-badge*)
				(*od-badge class="danger"*) Success (*/od-badge*)
				(*od-badge class="danger"*) Error   (*/od-badge*)
			</pre>
		</od-codeview>
		<div class="title big">Loading</div>
		<div class="title">Loading</div>
		<div class="flex-80">
			<od-loading />
			<od-loading class="light-dots"/>
		</div>
		<od-codeview :openbutton="true" :overlap="true">
			<pre>
				(*od-loading /*)
				(*od-loading class="light-dots" /*)
			</pre>
		</od-codeview>
	</div>

</template>

<script>

export default {
	name: 'tools',
}
</script>
