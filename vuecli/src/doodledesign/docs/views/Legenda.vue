<template>
	<od-legend :legend="legend" />
</template>

<script>

export default {

	name: 'legenda',

	data(){
		return {
			legend: [
				{ name: 'headers',    label: 'Headers'    },
				{ name: 'buttons',    label: 'Buttons'    },
				{ name: 'inputs',     label: 'Inputs'     },
				{ name: 'images',     label: 'images'     },
				{ name: 'selects',    label: 'Selects'    },
				{ name: 'switches',   label: 'Switches'   },
				{ name: 'panels',     label: 'Panels'     },
				{ name: 'accordions', label: 'Accordions' },
				{ name: 'badges',     label: 'Badges'     },
				{ name: 'icons',      label: 'Icons'      },
				{ name: 'alerts',     label: 'Alerts'     },
				{ name: 'lists',      label: 'Lists'      },
				{ name: 'layouts',    label: 'Layouts'    },
				{ name: 'tools',      label: 'Tools'      },
				{ name: 'install',    label: 'Install'    }
			],
		}
	},
}
</script>
