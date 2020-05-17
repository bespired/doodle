<?php

$pathToComponents = realpath(__DIR__ . '/../src/doodledesign/components');

$found = [];
addFiles($pathToComponents, $found);
$collect = createImports($found);

// import AlertModal   from './modals/AlertModal'
// import ConfirmModal from './modals/ConfirmModal'
// import LoginModal   from './modals/LoginModal'

// export default{
//   AlertModal,
//   ConfirmModal,
//   LoginModal,
// }

$imports = [];
$exports = [];

foreach ($collect as $export => $import) {
    $imports[] = $import;
    $exports[] = $export;
}

$file = join("\n", $imports) . "\n";
$file .= "\nexport default {\n    ";
$file .= join(",\n    ", $exports) . "\n";
$file .= "}\n";

file_put_contents($pathToComponents . '/index.js', $file);

exit;

function createImports($found)
{
    $names = [];
    foreach ($found as $path) {

        $route = explode('doodledesign/components/', $path)[1];
        if ($route === 'index.js') {
            continue;
        }
        $vuelessroute = str_replace('.vue', '', $route);
        $className    = str_replace('.vue', '', basename($path));

        $names[$className] = sprintf("import %s from './%s'", $className, $vuelessroute);

    }
    return $names;
}
function addFiles($target, &$found)
{
    $target = str_replace('//', '/', $target);
    if (is_dir($target)) {
        $files = glob($target . '/{,.}*[!.]', GLOB_MARK | GLOB_BRACE);
        foreach ($files as $file) {
            addFiles($file, $found);
        }
    } elseif (is_file($target) || is_link($target)) {
        $base = basename($target);
        if (substr($base, 0, 1) != '.') {
            $found[] = $target;
        }
    }

}
