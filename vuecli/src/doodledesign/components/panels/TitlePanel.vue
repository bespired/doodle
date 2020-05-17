<template>
    <div :id="$options.namedId" class="panel">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'title-panel',
}
</script>