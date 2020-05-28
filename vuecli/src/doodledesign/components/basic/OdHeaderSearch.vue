<template>
    <div class="od-panel-header" :class="type">
        <span class="od-search">
        	<input
        		:id="$options.namedId"
        		:name="$options.namedId"
        		type="text"
        		placeholder="Search"
        		v-model="searchvalue"
				autocomplete="search"
        		>
	        <od-iconpath name="search" class="od-search-eyeglass"/>
        </span>
    </div>
</template>
<script>
export default {
    name: 'od-header-search',
    props: {
        type: String
    },

	computed: {
		searchvalue: {
    		get: function () {
    			return this.$store.getters['doodlegui/getSearchValue']
    		},
    		set: function (newValue) {
                this.$store.commit('doodlegui/setSearchValue', {
                    value: newValue,
                })
    		}
  		},
	},

};
</script>

