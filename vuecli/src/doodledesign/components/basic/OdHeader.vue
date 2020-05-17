<template>
    <div class="od-panel-header" :class="type">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'od-header',
    props: {
        type: String
    },
};
</script>