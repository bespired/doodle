<template>
    <div class="od-panel-frame" :class="type">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'od-panel',
    props: {
        type: String
    },
};
</script>