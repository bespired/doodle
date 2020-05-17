/* eslint-disable no-alert, no-console */
<template>
    <div class="od-radiorow" :class="{disabled:disabled}">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'od-radiorow',
    props: {
        disabled: { type: Boolean,  default: null },
    }
}
</script>