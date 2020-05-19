/* eslint-disable no-alert, no-console */
<template>
    <div :id="$options.namedId" class="full-width">
        <div class="code-bar" :class="{ overlap:overlapping }" v-if="hasButton">
            <od-button class="simple smaller" icons="file-code" @click="codeOpen=!codeOpen" />
        </div>
        <pre :class="{open:codeOpen}">{{ code }}</pre>
    </div>
</template>
<script>
export default {
    name: 'od-codeview',
    props: {
        openbutton: { type: Boolean, default: null },
        overlap:    { type: Boolean, default: null },
        noOverlap:  { type: Boolean, default: null },
    },

    data() {
        return {
            code: this.codify(),
            codeOpen: this.openbutton === null ? true : !this.openbutton,
            overlapping: this.overlap === null ? true : this.overlap,
            hasButton: this.openbutton === null ? false : this.openbutton,
        }
    },

    methods: {
        codify() {
            let code = this.$slots.default[0].children[0].text
            // fix (* *) into < >
            let lgt = /\(\*/g,
                rgt = /\*\)/g,
                lht = /\(\{/g,
                rht = /\}\)/g
            code = code.replace(lgt, '<').replace(rgt, '>')
            code = code.replace(lht, '{{').replace(rht, '}}')

            // fix indent, convert tabs into spaces so mixed tabs ans spaces get fixed.
            let rows = code.split("\n")
            if (rows[0].trim() === '') rows.shift()
            let char = rows[0][0];
            let clen = rows[0].search(/\S/)
            let ripp = rows[0].substr(0, clen).replace(/\t/g, '    ').length

            rows.forEach((row, idx) => {
                rows[idx] = row.replace(/\t/g, '    ').substr(ripp)
            })

            if (rows[rows.length - 1].trim() === '') rows.pop()
            return rows.join("\n")
        }
    }

}
</script>