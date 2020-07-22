<template>

    <progress :max="max" :value="value"></progress>

</template>
<script>
    export default {
        name: 'od-progressbar',

        props: {
            value: {
                type: Number,
                default: 0,
            },
            max: {
                default: 100,
            },
        },
    };

</script>


