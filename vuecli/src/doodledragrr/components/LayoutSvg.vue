<template>
	<svg width="100%" height="100%" :viewBox="`0 0 ${display.w} 400`" version="1.1"
		xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" >

		<defs>
			<marker id="arrow-end" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"
			markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" class="od-arrow" /></marker>
			<marker id="arrow-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto"
			markerUnits="strokeWidth"><path d="M9,0 L9,6 L0,3 z" class="od-arrow" /></marker>
		</defs>

		<!-- draw the row -->
		<rect x="0" y="0" :width="display.w" :height="rowSvg.height" class="row-background-color"/>

		<!-- draw the max-width -->
		<rect :x="maxWidthSvg.left" y="0"
			:width="maxWidthSvg.width" :height="rowSvg.height" class="width-background-color"/>

		<!-- create a column-->
		<rect :x="gutterSvg.left" y="0"
			:width="rspSvg.step * rspSvg.column"
			:height="rowSvg.height" class="column-background-color"/>

		<!-- add a content-->
		<rect :x="gutterSvg.left + gutter.column"
			  :y="gutter.top"
			  :width="rspSvg.step * rspSvg.column - 2 * gutter.column"
			  :height="rowSvg.height - gutter.top - gutter.bottom"
			  class="content-background-color"/>
		<rect :x="gutterSvg.left + gutter.column"
			  :y="gutter.top"
			  :width="rspSvg.step * rspSvg.column - 2 * gutter.column"
			  :height="(rowSvg.height - gutter.bottom - gutter.top - 92 )"
			  class="width-background-color"/>

		<text
			:x="gutterSvg.left + gutter.column + 10"
			:y="rowSvg.height - gutter.bottom - 62" class="header">The header</text>
		<text
			:x="gutterSvg.left + gutter.column + 10"
			:y="rowSvg.height - gutter.bottom - 40" class="article">Some text of the article</text>
		<text
			:x="gutterSvg.left + gutter.column + 10"
			:y="rowSvg.height - gutter.bottom - 20" class="article">will be here.</text>


		<text x="50%" :y="display.base - 12" class="middle" v-if="maxWidth > 0">max-width: {{ maxWidth }}</text>
		<text x="50%" :y="display.base - 12" class="middle" v-else>full-width</text>

		<line :x1="maxWidthSvg.left"  :x2="maxWidthSvg.right"
			  :y1="display.base"      :y2="display.base"
			  class="od-size-wire"
			  marker-start="url(#arrow-start)" marker-end="url(#arrow-end)" />

		<!-- draw left/right gutter lines -->
		<path :d="`M${gutterSvg.left} 0 V${rowSvg.height}`" class="od-border-wire"/>
		<path :d="`M${gutterSvg.right} 0 V${rowSvg.height}`" class="od-border-wire"/>
		<path :d="`M${gutterSvg.left  + gutterSvg.column} 0 V${rowSvg.height}`" class="od-gutter-wire"/>
		<path :d="`M${gutterSvg.right - gutterSvg.column} 0 V${rowSvg.height}`" class="od-gutter-wire"/>

		<!-- draw top/bottom gutter lines -->
		<path :d="`M${gutterSvg.left} ${gutterSvg.top} h${rspSvg.width}`" class="od-gutter2-wire"/>
		<path :d="`M${gutterSvg.left} ${gutterSvg.bottom} h${rspSvg.width}`" class="od-gutter2-wire"/>

		<!-- draw responsive lines -->
		<path :d="`M${rspSvg.left} ${rowSvg.height + 15} v-30`" class="od-size-wire"/>
		<template v-for="step in responsive">
			<path
				:key="`od-size-wire-${step}`"
				:d="`M${rspSvg.left + rspSvg.step * step} ${rowSvg.height + 15} v-30`"
				class="od-size-wire"/>
			<text
				:key="`od-label-${step}`"
				:x="rspSvg.left + (rspSvg.step * step) - (rspSvg.step / 2)"
				:y="rowSvg.height - 2" class="label">{{ step }}</text>
		</template>
		<line
			:x1="gutterSvg.left" :x2="gutterSvg.right"
			:y1="rowSvg.height" :y2="rowSvg.height" class="od-size-wire" />

		<!-- draw example 3 columns -->
		<template v-for="step in [1,2]">
			<!-- border for responsive column -->
			<path
				:key="`od-border-wire-${step}`"
				:d="`M${rspSvg.left + rspSvg.step * rspSvg.column * step} 0 v${rowSvg.height}`"
				class="od-border-wire"/>
			<!-- gutter for responsive column -->
			<path
				:key="`od-gutter-left-wire-${step}`"
				:d="`M${rspSvg.left + rspSvg.step * rspSvg.column * step - gutterSvg.column} 0 v${rowSvg.height}`"
				class="od-gutter-wire" />
			<path
				:key="`od-gutter-right-wire-${step}`"
				:d="`M${rspSvg.left + rspSvg.step * rspSvg.column * step + gutterSvg.column} 0 v${rowSvg.height}`"
				class="od-gutter-wire" />
		</template>

	</svg>
</template>

<script>

export default {
	name: 'layout-svg',

	props: ['layout', 'media'],

	data(){
		const displays= {
			xlarge:  { w: 2280, h:  320, base: 370, height:  960 },
			desktop: { w: 1280, h:  320, base: 370, height:  960 },
			tablet:  { w: 1024, h:  300, base: 340, height:  768 },
			mobile:  { w:  320, h:  200, base: 240, height:  480 },
		}

		const mediasizes = this.layout.media[this.media]

		return {
			display:    displays[this.media],
			responsive: this.layout.responsive,
			maxWidth:   mediasizes.fillstyle === 'full-width' ? 0 : parseInt(mediasizes.maxWidth, 10),
			gutter: {
				row:    parseInt(mediasizes.gutters.row, 10),
				column: parseInt(mediasizes.gutters.column, 10),
				top:    parseInt(mediasizes.gutters.top, 10),
				bottom: parseInt(mediasizes.gutters.bottom, 10),
			},
		}
	},

	computed: {

		rowSvg(){
			return {
				height: this.display.h
			}
		},
		maxWidthSvg() {
			return {
				left:  this.maxWidth === 0 ? 0 : Math.max( 0, (this.display.w - this.maxWidth) / 2) ,
				right: this.maxWidth === 0 ? this.display.w : Math.min( this.display.w, this.display.w - (this.display.w - this.maxWidth) / 2),
				width: this.maxWidth === 0 ? this.display.w : this.maxWidth,
			}
		},
		gutterSvg(){
			if ( this.gutter.row < 0 ) this.gutter.row = 0
			return {
				left:   this.maxWidthSvg.left  + this.gutter.row,
				right:  this.maxWidthSvg.right - this.gutter.row,
				top:    this.gutter.top,
				bottom: this.rowSvg.height - this.gutter.bottom,
				column: this.gutter.column
			}
		},
		rspSvg(){
			return {
				left:   this.gutterSvg.left,
				right:  this.gutterSvg.right,
				step:   Math.max( 0, this.gutterSvg.right - this.gutterSvg.left) / this.responsive,
				width:  Math.max( 0, this.gutterSvg.right - this.gutterSvg.left),
				column: Math.round( this.responsive / 3 )
			}
		}

	},


}
</script>

<style>
 .row-background-color {
	fill:rgb(180,180,180);
 }
 .width-background-color {
	fill:rgb(200,200,200);
 }
 .content-background-color {
	fill:rgb(255,255,255);
 }
 .column-background-color {
	fill:rgba(112,168,186, 0.5);
 }

 .od-device-look svg{
	margin-bottom: -8px;
	border-bottom-right-radius: 8px;
	border-bottom-left-radius: 8px;
	background: white;
}
.od-device-look svg text{
	font-size: 1.2em;
	dominant-baseline: middle;
	text-anchor: middle;
}

.od-device-look svg .label{
	font-size: 1em;
	dominant-baseline: initial;
	text-anchor: middle;
	fill: rgba(0,0,0,.25);
}

.od-device-look svg text.header{
	font-size: 1.2em;
	font-weight: 900;
	text-anchor: start;
	dominant-baseline: initial;
}
.od-device-look svg text.article{
	font-size: 1.1em;
	font-weight: 500;
	text-anchor: start;
	dominant-baseline: initial;
}

.od-mobile-look svg text{
	font-size: 0.5em;
}

.od-arrow{
	fill: #000;
}
.od-size-wire{
	stroke: #000;
	stroke-width: 1;
}
.od-border-wire {
	stroke: #00f;
	stroke-width: 1;
}
.od-gutter-wire {
	stroke: #00f;
	stroke-width: 1;
	stroke-dasharray: 4;
}
.od-gutter2-wire {
	stroke: #f0f;
	stroke-width: 1;
	stroke-dasharray: 4;
}
</style>