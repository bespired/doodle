<template>
	<div class="od-window-header">
		<od-button function="radio" smodel="devicesize" value="mobile"  icons="mobile"   class="push-middle square"/>
    	<od-button function="radio" smodel="devicesize" value="tablet"  icons="tablet"   class="square"/>
    	<od-button function="radio" smodel="devicesize" value="desktop" icons="desktop"  class="square"/>
	</div>
</template>
<script>
export default {
	name: 'device-sizes',
}
</script>