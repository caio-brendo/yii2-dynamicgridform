<?php

namespace caiobrendo\dynamicgridform;

use yii\web\AssetBundle;

class DynamicGridFormAsset extends AssetBundle
{
    /**
     * @inheritdoc
     */
    public $sourcePath = __DIR__ . '/assets';

    /**
     * @inheritdoc
     */
    public $depends = [
        'yii\web\JqueryAsset'
    ];

    /**
     * @inheritdoc
     */
    public $publishOptions = [
        'forceCopy' => YII_DEBUG ? true : false,
    ];

    /**
     * Set up the JavaScript
     * @return void
     */
    public function setupJs(){
        $files = [
            'js/InputHelper',
            'js/DynamicGridForm',
            'js/Column',
            'js/TextColumn',
            'js/ActionColumn',
            'js/NormalColumn',
            'js/inputs/BaseInput',
            'js/inputs/InputMultipleValue',
            'js/inputs/InputSingleValue',
            'js/inputs/RadioInput',
            'js/inputs/CheckboxInput',
            'js/inputs/DivInputCheckbox',
            'js/inputs/DivInputRadio',
            'js/inputs/InputFactory',
            'js/inputs/FileInput',
            'js/inputs/SelectInputSingle',
            'js/UnreferencedColumn',
        ];
        $js = [
            'amplified' => [],
            'minified' => []
        ];
        foreach ($files as $file){
            $js['amplified'][] = "$file.js";
            $js['minified'][] = "$file.min.js";
        }

        $this->js = YII_DEBUG ? $js['amplified'] : $js ['minified'];
    }

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->setupJs();
        parent::init();
    }
}