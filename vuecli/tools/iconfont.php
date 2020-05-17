<?php

$glyphs = GLOB(__DIR__ . '/../src/doodledesign/glyphs/*.svg', GLOB_BRACE);

$docs = [];
$icon = [];
foreach ($glyphs as $filepath) {

    $filedata  = file_get_contents($filepath);
    $icondata  = extractPath($filedata);
    $glyphname = str_replace('.svg', '', basename($filepath));

    if ($icondata) {
        $icon[] = sprintf('    "%s":', $glyphname);
        $icon[] = sprintf('        "%s",', $icondata);
        $docs[] = sprintf("\t\t\t" . '<div class="od-icon-spacer"><od-iconpath name="%s" />%s</div>', $glyphname, $glyphname);
    }

}

$nl      = "\n";
$leading = '<!-- insert fonts here -->';
$ending  = '<!-- end fonts here -->';

$filepath = realpath(__DIR__ . '/../src/doodledesign/docs/pages') . '/Icons.vue';
$doc      = file_get_contents($filepath);
$re       = '/' . $leading . '([\s\S]*?)' . $ending . '/m';

$result = preg_replace($re, $leading . $nl . join("\n", $docs) . $nl . "\t\t\t" . $ending, $doc);
file_put_contents($filepath, $result);

$filepath = realpath(__DIR__ . '/../src/doodledesign/components/basic/');
file_put_contents(
    $filepath . '/OdIconpath.vue',
    sprintf(template(), $glyphname, join("\n", $icon))
);

echo "Created OdIconpath.vue in $filepath.\n";

exit;

function extractPath($str)
{
    $re = '/ d=[\'|"]([\s\S]*?)[\'|"]/m';
    preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);

    if (!count($matches)) {
        return;
    }
    return $matches[0][1];
}

function template()
{
    return <<<VUEJS
<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024" title="%s">
        <path :d="path" fill="currentColor"/>
    </svg>
</template>

<script>
const icons = {
%s
};
export default {
    name: 'od-iconpath',
    props: {
        name: String
    },
    computed: {
        path() {
            return icons[this.name];
        }
    }
};
</script>
VUEJS;
}

function config()
{
    return [
        'alert',
        'audit',
        'hart-full',
    ];
}
