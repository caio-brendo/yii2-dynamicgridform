<?php

namespace caiobrendo\dynamicgridform;

use Yii;
use yii\base\Model;
use yii\helpers\ArrayHelper;

class Helper extends Model
{
    /**
     * Creates and populates a set of models.
     *
     * @param string $modelClass
     * @param array $multipleModels
     * @return array
     */
    public static function createMultiple($modelClass, $multipleModels = [], $scenario = null, $data = null)
    {
        $model = new $modelClass;
        $formName = $model->formName();
        $pkModel = $model->tableSchema->primaryKey;
        $post = empty($data) ? Yii::$app->request->post($formName) : $data[$formName];
        $models = [];

        if (!empty($multipleModels)) {
            $keys = array_keys(ArrayHelper::map($multipleModels, $pkModel[0], $pkModel[0]));
            $multipleModels = array_combine($keys, $multipleModels);
        }

        if ($post && is_array($post)) {
            foreach ($post as $i => $item) {
                if (isset($item[$pkModel[0]]) && !empty($item[$pkModel[0]]) && isset($multipleModels[$item[$pkModel[0]]])) {
                    $models[] = $multipleModels[$item[$pkModel[0]]];
                } else {
                    $models[] = new $modelClass;
                }
            }
        }

        if ($scenario) {
            foreach ($models as $model) {
                $model->cenario = $scenario;
            }
        }

        unset($model, $formName, $post);

        return (!isset($models) || empty($models)) ? [] : $models;
    }
}