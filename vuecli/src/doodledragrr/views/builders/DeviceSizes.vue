<template>
	<div class="od-window-header">
		<od-button class="double" @click="$eventHub.$emit('index')">Index</od-button>

		<od-button function="radio" smodel="devicesize" value="mobile"  icons="mobile"   class="push-middle square"/>
    	<od-button function="radio" smodel="devicesize" value="tablet"  icons="tablet"   class="square"/>
    	<od-button function="radio" smodel="devicesize" value="desktop" icons="desktop"  class="square"/>
    	<od-button function="radio" smodel="devicesize" value="xlarge"  icons="desktop"  class="square"/>
	</div>
</template>
<script>
export default {
	name: 'device-sizes',

}
</script>