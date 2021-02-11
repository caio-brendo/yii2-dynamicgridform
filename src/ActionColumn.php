<?php

namespace caiobrendo\dynamicgridform;

use Closure;
use yii\base\InvalidConfigException;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\web\JsExpression;

class ActionColumn extends Column
{
    /** @var string */
    public $header;
    /** @var string */
    public $template;
    /** @var Closure[]|string[] */
    public $buttons;
    /** @var Closure|string */
    public $visibleButtons;
    /** @var JsExpression[]|bool[] */
    public $visibleButtonsClient;
    /** @var JsExpression[]|string[] */
    public $buttonsClient;
    /** @var JsExpression */
    public $classJs;

    public function init()
    {
        if (!$this->template) {
            throw new InvalidConfigException("The 'template' property must be set.");
        }
    }

    /**
     * @inheritDoc
     */
    public function renderContent($model, $key, $index)
    {
        $data = preg_replace_callback('/\\{([\w\-\/]+)\\}/', function ($matches) use ($model, $key, $index) {
            $name = $matches[1];
            if (isset($this->visibleButtons[$name])) {
                $isVisible = $this->visibleButtons[$name] instanceof Closure
                    ? call_user_func($this->visibleButtons[$name], $model, $key, $index)
                    : $this->visibleButtons[$name];
            } else {
                $isVisible = true;
            }

            if ($isVisible && isset($this->buttons[$name])) {
                return $this->buttons[$name] instanceof Closure ?
                    call_user_func($this->buttons[$name], $model, $key) :
                    $this->buttons[$name];
            }

            return '';
        }, $this->template);

        return Html::tag('td', $data, $this->options ?: []);
    }

    /**
     * @inheritDoc
     */
    public function getClassJs()
    {
        $visibleButtons = Json::encode($this->visibleButtonsClient);
        $buttons = Json::encode($this->buttonsClient);
        $template = Json::encode($this->template);
        $options = Json::encode($this->options);
        return new JsExpression("new ActionColumn({
        'visibleButtons': $visibleButtons,
        'buttons': $buttons,
        'template': $template,
        'options': $options 
        })");
    }

    /**
     * @inheritDoc
     */
    public function getHeaderName()
    {
        return $this->header ?: '';
    }
}