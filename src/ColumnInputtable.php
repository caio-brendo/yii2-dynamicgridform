<?php

namespace caiobrendo\dynamicgridform;

use Closure;
use yii\base\Model;
use yii\helpers\Html;
use yii\web\JsExpression;

abstract class ColumnInputtable extends Column
{
    /** @var string */
    public $id;
    /** @var string */
    public $attribute;
    /** @var string */
    public $templateInputName;
    /** @var string|Closure */
    public $value;
    /** @var string|JsExpression */
    public $valueOnInsert;
    /** @var string|Closure */
    public $text;
    /** @var string|JsExpression */
    public $textOnInsert;

    /**
     * @inheritDoc
     */
    public function __construct($config = [])
    {
        $model = new $config['grid']->modelClass();
        $config['templateInputName'] = Html::getInputName($model, "[<@>]{$config['attribute']}");

        parent::__construct($config);

    }


    /**
     * Returns the input
     * @param $model Model
     * @param $key int
     * @return string
     */
    public function getInput($model, $key)
    {
        $attribute = $this->attribute;
        $value = $model->$attribute;
        if ($this->value) {
            $value = $this->value instanceof Closure
                ? call_user_func($this->value, $model, $key, $key)
                : $this->value;
        }
        $name = Html::getInputName($model, "[$key]$attribute");
        return "<input type=\"hidden\" name=\"$name\" value=\"{$value}\" data-reference=\"{$this->id}\" >";
    }

    /**
     * Returns de header name
     * @return string
     */
    public function getHeaderName()
    {
        if ($this->header) {
            return $this->header;
        }

        return (new $this->grid->modelClass())
            ->getAttributeLabel($this->attribute);
    }
}