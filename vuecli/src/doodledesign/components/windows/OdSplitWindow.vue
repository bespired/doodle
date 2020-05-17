<template>
	<div :class="localClass">
		<div class="top-title ucfirst">
			<slot name="title">&nbsp;</slot>
		</div>
		<div class="sub-title ucfirst">
			<slot name="subtitle"></slot>
		</div>
		<div class="inner-window-flex">
			<div :class="leftClass">
				<div class="od-header">
					<slot name="leftMenu"><!-- left menu--></slot>
				</div>
				<div class="od-content">
					<slot name="leftContent">left content missing</slot>
				</div>
			</div>
			<div :class="rightClass">
				<div class="od-header">
					<slot name="rightMenu"><!-- right menu --></slot>
				</div>
				<div class="od-content">
					<slot name="rightContent">right content missing</slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'od-split-window',
	props: ['sizes', 'types'],
	data() {

		let leftSize = ['od-split-left']
		let rightSize = ['od-split-right']

		if (this.sizes !== undefined) leftSize.push(this.sizes.split(',')[0])
		if (this.sizes !== undefined) rightSize.push(this.sizes.split(',')[1])

		if (this.types !== undefined) leftSize.push(this.types.split(',')[0])
		if (this.types !== undefined) rightSize.push(this.types.split(',')[1])

		return {
			localClass: 'inner-panel split--' + this.sizes.replace(',', '--'),
			leftClass: leftSize.join(' '),
			rightClass: rightSize.join(' ')
		}
	}
}
</script>