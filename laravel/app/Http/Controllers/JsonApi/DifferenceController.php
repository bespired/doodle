<?php

namespace App\Http\Controllers\JsonApi;

use App\Http\Controllers\Controller;

class DifferenceController extends Controller
{

    public function differences()
    {

        // if (in_array($src_stage, ['local', 'staging', 'production']) === false) {
        //     abort(422, sprintf('No such stage: %s.', $stage));
        // }

        // $dbs = json_decode(file_get_contents(resource_path('json/dbs.json')));
        // return json_encode($dbs);

        //

        $db = [];
        foreach (['local', 'staging', 'production'] as $stage) {
            $db[$stage] = $this->fetchDbStructure($stage);
        }

        return [
            'local'      => [
                'name'   => 'local',
                'label'  => 'Local',
                'stages' => [
                    'from_staging'    => [
                        'name'      => 'from_staging',
                        'label'     => 'From staging',
                        'structure' => $this->array_explode(array_values(array_diff($db['staging'], $db['local']))),
                    ],
                    'from_production' => [
                        'name'      => 'from_production',
                        'label'     => 'From production',
                        'structure' => $this->array_explode(array_values(array_diff($db['production'], $db['local']))),
                    ],
                ],
            ],
            'staging'    => [
                'name'   => 'staging',
                'label'  => 'Staging',
                'stages' => [
                    'from_local'      => [
                        'name'      => 'from_local',
                        'label'     => 'From local',
                        'structure' => $this->array_explode(array_values(array_diff($db['local'], $db['staging']))),
                    ],
                    'from_production' => [
                        'name'      => 'from_production',
                        'label'     => 'From production',
                        'structure' => $this->array_explode(array_values(array_diff($db['production'], $db['staging']))),
                    ],
                ],
            ],
            'production' => [
                'name'   => 'production',
                'label'  => 'Production',
                'stages' => [
                    'from_local'   => [
                        'name'      => 'from_local',
                        'label'     => 'From local',
                        'structure' => $this->array_explode(array_values(array_diff($db['local'], $db['production']))),
                    ],
                    'from_staging' => [
                        'name'      => 'from_staging',
                        'label'     => 'From staging',
                        'structure' => $this->array_explode(array_values(array_diff($db['staging'], $db['production']))),
                    ],
                ],
            ],
        ];

    }

    private function array_explode($arr)
    {
        $ret = [];
        foreach ($arr as $str) {
            list($db, $table, $column) = explode("/", $str);
            $ret[$db][$table][$column] = $column;
        }
        return $ret;
    }

    private function fetchDbStructure($stage)
    {

        $dbs = [];
        $mns = [];
        foreach (config('database.connections') as $name => $value) {
            if (substr($name, 0, strlen($stage)) == $stage) {
                $dbs[$name] = [];
            }
        }

        foreach ($dbs as $connection => $data) {
            $rawtables = \DB::connection($connection)->select('SHOW TABLES');
            $database  = substr($connection, 1 + strlen($stage));

            foreach ($rawtables as $table) {
                foreach ($table as $key => $value) {
                    $dbs[$connection][$value] = \DB::connection($connection)->getSchemaBuilder()->getColumnListing($value);
                    foreach ($dbs[$connection][$value] as $column) {
                        $mns[] = sprintf("%s/%s/%s", $database, $value, $column);
                    }
                }
            }
        }

        return $mns;
    }

}
