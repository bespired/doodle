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
			<div :class="centerClass">
				<div class="od-header">
					<slot name="centerMenu"><!-- right menu --></slot>
				</div>
				<div class="od-content">
					<slot name="centerContent">center content missing</slot>
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
	name: 'od-split3-window',
	props: ['sizes', 'types'],
	data() {

		let leftSize   = ['od-split-left']
		let centerSize = ['od-split-center']
		let rightSize  = ['od-split-right']

		if (this.sizes !== undefined) leftSize.push(this.sizes.split(',')[0])
		if (this.sizes !== undefined) centerSize.push(this.sizes.split(',')[1])
		if (this.sizes !== undefined) rightSize.push(this.sizes.split(',')[2])

		if (this.types !== undefined) leftSize.push(this.types.split(',')[0])
		if (this.types !== undefined) centerSize.push(this.types.split(',')[1])
		if (this.types !== undefined) rightSize.push(this.types.split(',')[2])

		return {
			localClass: 'inner-panel split--' + this.sizes.replace(',', '--').replace(',', '--'),
			leftClass: leftSize.join(' '),
			centerClass: centerSize.join(' '),
			rightClass: rightSize.join(' ')
		}
	}
}
</script>