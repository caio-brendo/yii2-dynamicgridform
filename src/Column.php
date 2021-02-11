<?php

namespace caiobrendo\dynamicgridform;

use JsonSerializable;
use yii\base\BaseObject;
use yii\helpers\Html;
use yii\web\JsExpression;

abstract class Column extends BaseObject implements ColumnInterface, JsonSerializable {
    /** @var JsExpression */
    public $classJs;
    /** @var array */
    public $options = [];
    /** @var DynamicGridForm */
    public $grid;
    /** @var array */
    public $headerOptions = [];
    /** @var array */
    public $contentOptions = [];

    /**
     * Column constructor.
     * @param array $config
     */
    public function __construct($config = [])
    {
        parent::__construct($config);
        $this->classJs = $this->getClassJs();
    }

    /**
     * Render header
     * @return string
     */
    public function renderHeader()
    {
        return Html::tag('th', $this->getHeaderName(), $this->headerOptions);
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        unset($vars['grid']);
        return $vars;
    }
}