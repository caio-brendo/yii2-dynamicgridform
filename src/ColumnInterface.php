<?php

namespace caiobrendo\dynamicgridform;

use app\models\Model;
use yii\web\JsExpression;

interface ColumnInterface
{
    /**
     * Render the content of column
     * @param $model Model The model that represents the current row
     * @param $key integer The key of current row
     * @param $index integer The index of current row
     * @return string
     */
    public function renderContent($model, $key, $index);

    /**
     * Render the header of column
     * @return string
     */
    public function renderHeader();

    /**
     * Get class that represents the column in Javascript
     * @return JsExpression
     */
    public function getClassJs();

    /**
     * Returns the header name
     * @return string
     */
    public function getHeaderName();
}