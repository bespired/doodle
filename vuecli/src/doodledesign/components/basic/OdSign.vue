<template>
    <div class="sign" :class="type">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1024 1024">
            <path :d="path" fill="currentColor" />
        </svg>
    </div>
</template>
<script>
const icons = {
    "warning" : "M567 100q-8-14-23-22t-31-9q-16 0-31 9t-24 22L30 855q-8 14-8 31t8 32q9 14 23 23t32 8h856q17 0 31-8t23-24q8-15 8-31t-8-31zm8 717H450V698h125v125zm0-187H450V386h125v250z",
    "success" : "M945 311q0 22-16 38L449 829q-16 15-38 15t-38-15L95 551q-15-16-15-38t15-38l76-76q16-16 38-16t38 16l164 165 366-367q16-16 38-16t38 16l76 76q16 15 16 38z",
    "danger"  : "M605 512l234 234-93 93-234-235-234 235-93-93 235-234-235-234 93-93 234 234 234-234 93 93z",
};
export default {
    name: 'od-sign',
    props: {
        type: String
    },
    computed: {
        path() {
            return icons[this.type];
        }
    }
};
</script>