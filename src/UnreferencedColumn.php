<?php

namespace caiobrendo\dynamicgridform;

use yii\base\InvalidConfigException;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\web\JsExpression;

class UnreferencedColumn extends TextColumn
{
    /**
     * @var bool Clean input after insert grid
     */
    public $cleanAfterInsert = true;
    /**
     * @var string
     */
    public $header;

    /**
     *
     */
    public function init()
    {
        if (!$this->attribute) {
            throw new InvalidConfigException("The 'attribute' property must be set.");
        }

        if (!$this->textOnInsert) {
            throw new InvalidConfigException("The 'textOnInsert' property must be set.");
        }

        if (!$this->valueOnInsert) {
            throw new InvalidConfigException("The 'valueOnInsert' property must be set.");
        }
    }

    /**
     * @inheritDoc
     */
    public function renderContent($model, $key, $index)
    {
        $attribute = $this->attribute;
        if ($this->text) {
            $text = $this->text instanceof \Closure
                ? call_user_func($this->text, $model, $key, $index, $this->getInputName($model, $key))
                : $this->text;
        } else {
            $text = $model->$attribute;
        }

        return Html::tag('td', $text . $this->getInput($model, $key), $this->options);
    }

    /**
     * @inheritDoc
     */
    public function getClassJs()
    {
        $config = Json::encode($this);
        return new JsExpression("new UnreferencedColumn($config)");
    }

}