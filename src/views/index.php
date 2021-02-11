<?php

use caiobrendo\dynamicgridform\DynamicGridForm;
use yii\helpers\Html;

/**
 * @var DynamicGridForm $model
 */

?>
<div id="<?= $model->widgetContainer ?>">
    <table <?= Html::renderTagAttributes($model->options) ?>>
        <thead>
        <tr <?= Html::renderTagAttributes($model->headerRowOptions) ?> >
            <?php foreach ($model->columns as $column): ?>
                <?= $column->renderHeader() ?>
            <?php endforeach; ?>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($model->multipleModels as $key => $models): ?>
            <tr <?= Html::renderTagAttributes($model->rowOptions) ?>>
                <?php foreach ($model->columns as $column): ?>
                    <?php echo $column->renderContent($models, $key, $key); ?>
                <?php endforeach; ?>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</div>