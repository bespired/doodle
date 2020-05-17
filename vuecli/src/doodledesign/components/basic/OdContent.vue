<template>
    <div class="od-panel-content" :class="type">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'od-content',
    props: {
        type: String
    },
};
</script>