<template>
	<div class="od-window-header">
		<od-button function="radio" smodel="preview" value="layout"  icons="layout" class="push-right square"/>
    	<od-button function="radio" smodel="preview" value="preview" icons="eye"    class="square"/>
	</div>
</template>
<script>
export default {
	name: 'preview-view',
}
</script>