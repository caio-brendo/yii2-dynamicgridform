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
    public $js = [
        'js/amplified/InputHelper.js',
        'js/amplified/DynamicGridForm.js',
        'js/amplified/Column.js',
        'js/amplified/ColumnInputtable.js',
        'js/amplified/ActionColumn.js',
        'js/amplified/NormalColumn.js',
        'js/amplified/inputs/BaseInput.js',
        'js/amplified/inputs/InputMultipleValue.js',
        'js/amplified/inputs/InputSingleValue.js',
        'js/amplified/inputs/RadioInput.js',
        'js/amplified/inputs/CheckboxInput.js',
        'js/amplified/inputs/DivInputCheckbox.js',
        'js/amplified/inputs/DivInputRadio.js',
        'js/amplified/inputs/InputFactory.js',
        'js/amplified/inputs/FileInput.js',
        'js/amplified/inputs/SelectInputSingle.js',
    ];

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
}