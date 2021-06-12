<?php

namespace caiobrendo\dynamicgridform;

use Yii;
use yii\base\InvalidConfigException;
use yii\base\Model;
use yii\bootstrap\Widget;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;
use yii\web\View;

class DynamicGridForm extends Widget
{
    /**
     * @var array
     */
    public $columns;

    /**
     * @var string
     */
    public $insertButton;

    /**
     * @var Model[]
     */
    public $multipleModels;

    /**
     * @var string
     */
    public $widgetContainer;

    /**
     * @var int
     */
    public $max = 0;

    /**
     * @var string
     */
    public $insertPosition = 'bottom';

    /**
     * @var string
     */
    public $hash;

    /**
     * @var bool
     */
    public $allowEdit = false;

    /**
     * @var array The HTML tag attributes (HTML options) in terms of name-value
     * pairs. These will be rendered as the attributes of the resulting tag.
     * The values will be HTML-encoded using [[encode()]]. If a value is null,
     * the corresponding attribute will not be rendered. For example when using
     * `['class' => 'my-class', 'target' => '_blank', 'value' => null]` it will
     * result in the html attributes rendered like this: `class="my-class"
     * target="_blank"`. See [[renderTagAttributes()]] for details on how
     * attributes are being rendered.
     */
    public $rowOptions = [];

    /**
     * @var array The HTML tag attributes (HTML options) in terms of name-value
     * pairs. These will be rendered as the attributes of the resulting tag.
     * The values will be HTML-encoded using [[encode()]]. If a value is null,
     * the corresponding attribute will not be rendered. For example when using
     * `['class' => 'my-class', 'target' => '_blank', 'value' => null]` it will
     * result in the html attributes rendered like this: `class="my-class"
     * target="_blank"`. See [[renderTagAttributes()]] for details on how
     * attributes are being rendered.
     */
    public $headerRowOptions = [];

    /**
     * The class that delete row
     * @var string
     */
    public $deleteRowClass = '';

    /**
     * The class name of model referenced.
     * @var string
     */
    public $modelClass;



    /**
     * @inheritDoc
     */
    public function init()
    {
        if (!$this->columns) {
            throw new InvalidConfigException("The 'columns' property must be set.");
        }

        if (!is_array($this->columns)) {
            throw new InvalidConfigException("The 'columns' property must be an array.");
        }

        if (!$this->insertButton) {
            throw new InvalidConfigException("The 'insertButton' property must be set.");
        }

        if (!is_array($this->multipleModels)) {
            throw new InvalidConfigException("The 'multipleModels' property must be an array.");
        }

        if (!$this->modelClass){
            throw new InvalidConfigException("The 'modelClass' property must be set.");
        }

        $this->hash = $this->getHash();

        if (!$this->widgetContainer) {
            $this->widgetContainer = 'dgf-' . $this->hash;
        }

        if (!isset($this->options['id']) || (isset($this->options['id']) && !$this->options['id'])) {
            $this->options['id'] = 'tbl-dgf-' . $this->hash;
        }

        if (!isset($this->options['class'])) {
            $this->options['class'] = 'table table-striped table-hover';
        }

        $this->initColumns();
        $this->registerJs($this->getView());
        parent::init();
    }

    /**
     * Generate a hash
     * @return string
     */
    public function getHash()
    {
        return hash('crc32', uniqid('', true));
    }

    /**
     * Init columns
     * @throws InvalidConfigException
     */
    public function initColumns()
    {
        foreach ($this->columns as $key => $column) {
            $class = isset($column['class']) ? $column['class'] : NormalColumn::class;
            $this->columns[$key] = Yii::createObject(ArrayHelper::merge(
                [
                    'class' => $class,
                    'grid' => $this
                ],
                $column
            ));
        }
    }

    /**
     * Register js
     * @param View $view
     */
    public function registerJs(View $view)
    {
        $js = "new DynamicGridForm({$this->configToJson()});";
        $view->registerJs($js, $view::POS_READY);

        DynamicGridFormAsset::register($view);
    }

    /**
     * Returns the config options to JSON
     * @return false|string
     */
    public function configToJson()
    {
        return Json::encode([
            'columns' => $this->columns,
            'insertButton' => $this->insertButton,
            'widgetContainer' => $this->widgetContainer,
            'max' => $this->max,
            'insertPosition' => $this->insertPosition,
            'allowEdit' => $this->allowEdit,
            'options' => $this->options,
            'rowOptions' => $this->rowOptions,
            'deleteRowClass' => $this->deleteRowClass
        ]);
    }

    /**
     * Checks if has multiple models
     * @return bool
     */
    public function hasMultipleModels()
    {
        return (bool)$this->multipleModels;
    }

    /**
     * @inheritDoc
     * @return string
     */
    public function run()
    {
        return $this->render('index.php', [
            'model' => $this
        ]);
    }
}