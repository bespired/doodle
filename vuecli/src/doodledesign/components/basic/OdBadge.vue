<template>
    <div class="badge" :class="type">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'od-badge',
    props: {
        type: String
    },
};
</script>