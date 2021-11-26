<?php

namespace caiobrendo\dynamicgridform;

use Closure;
use yii\base\Model;
use yii\helpers\Html;
use yii\web\JsExpression;

abstract class TextColumn extends Column
{
    /** @var string */
    public $attribute;
    /** @var string|Closure */
    public $value;
    /** @var string|JsExpression */
    public $valueOnInsert;
    /** @var string|Closure */
    public $text;
    /** @var string|JsExpression */
    public $textOnInsert;
    /** @var string */
    public $templateInputName;

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

    /**
     * Returns the input
     * @param $model Model
     * @param $key int
     * @param $id string
     * @return string
     */
    public function getInput($model, $key, $id = null)
    {
        $attribute = $this->attribute;
        $value = $model->$attribute;
        if ($this->value) {
            $value = $this->value instanceof Closure
                ? call_user_func($this->value, $model, $key, $key)
                : $this->value;
        }
        $reference = $id ? 'data-reference="{$id}"' : '';
        $name = Html::getInputName($model, "[$key]$attribute");
        return "<input type=\"hidden\" name=\"$name\" value=\"{$value}\" $reference>";
    }
}