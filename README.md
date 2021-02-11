<p align="center">
    <h1 align="center">Dynamic Grid Form</h1>
    <br>
</p>

Dynamic Grid Form is a widget for the yii2 structure to add values to a grid. It is very useful for working with one-to-many data. 

[![Latest Stable Version](https://img.shields.io/packagist/v/caio-brendo/rating-input)](https://packagist.org/packages/caio-brendo/rating-input)
[![Total Downloads](https://img.shields.io/packagist/dm/caio-brendo/rating-input?color=green)](https://packagist.org/packages/caio-brendo/rating-input)


DIRECTORY STRUCTURE
-------------------

      src/             contains source code of widget
      src/assets       contains assets definition
      src/views        contains view files



REQUIREMENTS
------------

The minimum requirement by this project template that your Web server supports PHP 5.6.0.


INSTALLATION
------------

### Install via Composer

If you do not have [Composer](http://getcomposer.org/), you may install it by following the instructions
at [getcomposer.org](http://getcomposer.org/doc/00-intro.md#installation-nix).

You can then install this widget using the following command:

~~~
composer require caio-brendo/yii2-dynamicgridform
~~~

PREVIEW
------------
![Alt Text](https://user-images.githubusercontent.com/54366167/107451588-5b529480-6b26-11eb-9b51-c2c043b41c54.gif)

USAGE
------------

### The view

You must have inputs to your values will be appended in the grid and references in the DynamicGridForm through the input id.
Replace the "multipleModels" by your array of objects that contains the values and "modelClass" by a string that refence your model.
Each column corresponds to an entry and must contain the attribute in the model that this column references.
The following code renders the DynamicGridForm used in preview.

```php
<?php 
use app\models\Telephone;
use caiobrendo\dynamicgridform\ActionColumn;
use caiobrendo\dynamicgridform\DynamicGridForm;
use caiobrendo\dynamicgridform\NormalColumn;
use yii\helpers\Html;
use yii\web\JsExpression;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $form yii\widgets\ActiveForm */
/* @var $telephones Telephone[] */
?>
<div class="row">
        <div class="col-md-2">
            <div class="form-group">
                <label class="control-label" for="telephone-ddi">DDI</label>
                <?= Html::dropDownList('ddi', null, [55 => 'Brasil', 213 => 'Argentina'], [
                    'id' => 'telephone-ddi',
                    'class' => 'form-control',
                    'prompt' => 'Selecione...'
                ]) ?>
            </div>

        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label class="control-label" for="telephone-ddi">DDI</label>
                <?= Html::dropDownList('ddi', null, [61 => 'Brasilia', 62 => 'Goias'], [
                    'id' => 'telephone-ddd',
                    'class' => 'form-control',
                    'prompt' => 'Selecione...'
                ]) ?>
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label class="control-label" for="telephone-number">Number</label>
                <?= Html::textInput('number', null, [
                    'id' => 'telephone-number',
                    'class' => 'form-control'
                ]) ?>
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label class="control-label" for="telephone-type">Type</label>
                <?= Html::textInput('type', null, [
                    'id' => 'telephone-type',
                    'class' => 'form-control'
                ]) ?>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <?= Html::button('<i class="glyphicon glyphicon-plus"></i> Adicionar', [
                'id' => 'click',
                'class' => 'pull-leftbtn btn-primary btn-sm'
            ]) ?>
        </div>
    </div>
    <div class="row">
        <?= DynamicGridForm::widget([
            'widgetContainer' => 'dgf-container',
            'columns' => [
                [
                    'id' => 'telephone-ddi',
                    'attribute' => 'ddi',
                    'headerOptions' => [
                            'width' => 20
                    ]
                ],
                [
                    'id' => 'telephone-ddd',
                    'attribute' => 'ddd',
                    'headerOptions' => [
                        'width' => 20
                    ]
                ],
                [
                    'id' => 'telephone-number',
                    'attribute' => 'number',
                    'headerOptions' => [
                        'width' => 20
                    ]
                ],
                [
                    'id' => 'telephone-type',
                    'attribute' => 'type',
                    'headerOptions' => [
                        'width' => 20
                    ]
                ],
                [
                    'class' => ActionColumn::class,
                    'template' => '{delete}',
                    'buttonsClient' => [
                        'delete' => '<button type="button" class="pull-left btn btn-danger btn-xs delete"><i class="glyphicon glyphicon-minus"></i></button>'
                    ],
                    'buttons' => [
                        'delete' => '<button type="button" class="pull-left btn btn-danger btn-xs delete"><i class="glyphicon glyphicon-minus"></i></button>'
                    ],
                    'headerOptions' => [
                        'width' => 20
                    ]
                ]
            ],
            'insertButton' => 'click',
            'multipleModels' => $telephones,
            'modelClass' => Telephone::class,
            'deleteRowClass' => 'delete'
        ]);
        ?>
    </div>
```
### The controller
At the controller, you will receive the values attached to the grid when submitting the form. The values will be in the following format:

```php
<?php
 [
            'Telephone' => [
                0 => [
                    'ddi' => '55',
                    'ddd' => '61',
                    'number' => '999999999',
                    'type' => 'Cel'
                ],
                1 => [
                    0 => [
                        'ddi' => '55',
                        'ddd' => '62',
                        'number' => '88888888',
                        'type' => 'Tel'
                    ],
                ]
            ]
        ];
?>
````
Then with  the following code you can save the data.

```php
<?php

namespace app\controllers;

use app\models\Model;
use app\models\Telephone;
use app\models\User;
use caiobrendo\dynamicgridform\Helper;
use Yii;
use yii\filters\VerbFilter;
use yii\helpers\ArrayHelper;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

/**
 * UserController implements the CRUD actions for User model.
 */
class UserController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Creates a new User model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new User();
        $post = Yii::$app->request->post();
        $telephones = Helper::createMultiple(Telephone::class);
        if ($model->load($post) && Model::loadMultiple($telephones, $post) && $model->save()) {
            foreach ($telephones as $telephone) {
                $telephone->user_id = $model->id;
                if (!$telephone->save()) {
                    return false;
                }
            }
            return $this->redirect(['update', 'id' => $model->id]);
        }

        return $this->render('create', [
            'model' => $model,
            'telephones' => $telephones
        ]);
    }

    /**
     * Updates an existing User model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $telephones = $model->telephones;
        $post = Yii::$app->request->post();
        if ($model->load($post) && $model->save()) {
            $telephones = Helper::createMultiple(Telephone::class, $telephones);
            Model::loadMultiple($telephones, $post);
            $olds = ArrayHelper::map($model->telephones, 'id', 'id');
            $news = ArrayHelper::map($telephones, 'id', 'id');
            $delete = array_diff($olds, $news);
            Telephone::deleteAll(['id' => $delete]);

            foreach ($telephones as $telephone) {
                $telephone->user_id = $model->id;
                if (!$telephone->save()) {
                    return false;
                }
            }
            return $this->redirect(['update', 'id' => $model->id]);
        }

        return $this->render('update', [
            'model' => $model,
            'telephones' => $telephones
        ]);
    }

    /**
     * Finds the User model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return User the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = User::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
?>
````
SETTINGS
------------
The widget supports all parameters that one would pass for any [Yii Input Widget](https://github.com/yiisoft/yii2/blob/master/framework/widgets/InputWidget.php). The additional parameter settings specially available for the DynamicGridForm widget configuration are:

* columns: An array with column settings. Currently, we have two settings for columns: NormalColumn and ActionColumn. For NormalColumn the parameters accept are: 
    * headerOptions: An array with the options of header. You can see the options allowed [here](https://www.yiiframework.com/doc/api/2.0/yii-helpers-basehtml#renderTagAttributes()-detail).   
    * options: An array with the options of content. You can see the options allowed [here](https://www.yiiframework.com/doc/api/2.0/yii-helpers-basehtml#renderTagAttributes()-detail).
    * id: A string that reference an input id. This param is required
    * attribute: A string that referece an attribute of the model informed. This param is required
    * value: An string or clousure that will return the value of input hidden when the widget is rendered. When clousure is informed then the signature must be:
    ```php
  <?php 
  //...
  DynamicGridForm::widget([
      'columns' => [
          [
              'id' => 'telephone-ddi',
              'attribute' => 'ddi',
              'headerOptions' => [
                  'width' => 20
              ],
              'value' => static function($model, $index){
                  return $model->ddi;
              }                   
          ],
        //...
      ]
  ]);
  //...
  ?>
    ```
    * valueOnInsert: An string or an object of the class JsExpression that will return the value of input hidden when the new row is added. When object of the class JsExpression is informed then the signature must be:
    ```php
  <?php 
  use yii\web\JsExpression;
  //...
  DynamicGridForm::widget([
      'columns' => [
          [
              'id' => 'telephone-ddi',
              'attribute' => 'ddi',
              'headerOptions' => [
                  'width' => 20
              ],
              'valueOnInsert' => new JsExpression('(input) => {console.log(input);return $(input).val()}')
          ],
        //...
      ]
  ]);
  //...
  ?>
    ```
    * text: An string or clousure that will return the text that will shown in the grid when the widget is rendered. When clousure is informed then the signature must be:
    ```php
  <?php 
  //...
  DynamicGridForm::widget([
      'columns' => [
          [
              'id' => 'telephone-ddi',
              'attribute' => 'ddi',
              'headerOptions' => [
                  'width' => 20
              ],
              'text' => static function($model, $index){
                  return $model->ddi;
              }                   
          ],
        //...
      ]
  ]);
  //...
  ?>
    ```
    * textOnInsert: An string or clousure that will return the text that will shown in the grid when the new row is added. When object of the class JsExpression is informed then the signature must be:
    ```php
  <?php 
  use yii\web\JsExpression;
  //...
  DynamicGridForm::widget([
      'columns' => [
          [
              'id' => 'telephone-ddi',
              'attribute' => 'ddi',
              'headerOptions' => [
                  'width' => 20
              ],
              'textOnInsert' => new JsExpression('(input) => {console.log(input);return $(input).val()}')
          ],
        //...
      ]
  ]);
  //...
  ?>
    ```
    * cleanAfterInsert: A boolean param. If true after insert a line in the grid the input will be cleared.
    * header: A string to inform the column header in the grid.
    
* columns: For ActionColumn the parameters accept are: 
    * headerOptions: An array with the options of header. You can see the options allowed [here](https://www.yiiframework.com/doc/api/2.0/yii-helpers-basehtml#renderTagAttributes()-detail).   
    * options: An array with the options of content. You can see the options allowed [here](https://www.yiiframework.com/doc/api/2.0/yii-helpers-basehtml#renderTagAttributes()-detail).
    * header: A string to inform the column header in the grid.
    * template: A string with the template of buttons. Ex.: {delete} {dowload} {view}.
    * buttons: An array with the buttons that will be rendered when the widget is rendered. The value of this array can be a string or a clousure The follow code render a button to delete a line:
    ```php
  <?php 
  use yii\web\JsExpression;
  use caiobrendo\dynamicgridform\ActionColumn;
  //...
  DynamicGridForm::widget([
      'columns' => [
          [
              'class' => ActionColumn::class,
              'template' => '{delete}',
  //...           
              'buttons' => [
                  'delete' => static function($model,$index){
                      return '<button type="button" class="pull-left btn btn-danger btn-xs delete"><i class="glyphicon glyphicon-minus"></i></button>';
                  }
              ],
  //...
          ]
        //...
      ]
  ]);
  //...
  ?>
    ```
  * buttonsClient: An array with the buttons that will be rendered when a new line is inserted. The value of this array can be a string or an object of the class JsExpressoin. The follow code render a button to delete a line:
    ```php
    <?php 
    use yii\web\JsExpression;
    use caiobrendo\dynamicgridform\ActionColumn;
    //...
    DynamicGridForm::widget([
        'columns' => [
            [
                'class' => ActionColumn::class,
                'template' => '{delete}',
    //...           
                'buttonsClient' => [
                    'delete' => new JsExpression('(values, index) => {console.log(values); return \'<button type="button" class="pull-left btn btn-danger btn-xs delete"><i class="glyphicon glyphicon-minus"></i></button>\'}')
                ],
    //...
            ]
          //...
        ]
    ]);
    //...
    ?>
      ```   
  * visibleButtons: An array that inform if the button is visible when the widget is rendered. The value of this array can be a boolean or a clousure. The follow code show of a button:   
    ```php
    <?php 
      use yii\web\JsExpression;
      use caiobrendo\dynamicgridform\ActionColumn;
      //...
      DynamicGridForm::widget([
          'columns' => [
              [
                  'class' => ActionColumn::class,
                  'template' => '{delete}',
      //...           
                  'visibleButtons' => [
                      'delete' => static function($model,$index){
                          return 1 === 1; 
                      }
                  ],
      //...
              ]
            //...
          ]
      ]);
      //...
      ?> 
    ```
   * visibleButtonsClient: An array that inform if the button is visible when a new row is inserted. The value of this array can be a boolean or an object of the class JsExpression. The follow code show of a button:
    ```php
    <?php 
      use yii\web\JsExpression;
      use caiobrendo\dynamicgridform\ActionColumn;
      //...
      DynamicGridForm::widget([
          'columns' => [
              [
                  'class' => ActionColumn::class,
                  'template' => '{delete}',
      //...           
                  'visibleButtonsClient' => [
                      'delete' => new JsExpression('(values, key) => {console.log(values); return true;}')
                  ],
      //...
              ]
            //...
          ]
      ]);
      //...
      ?> 
    ```
* insertButton: A string to inform the id of the button that will add the data in the grid. This param is required.
* multipleModels: An array that contains your multiples models. This parma is required.
* widgetContainer: A string to enter a widget container id.
* max: A number that limits the number of lines inserted. When 0 is informed then will be unlimited. Default 0.
* insertPosition: A string (bottom or top) to inform where the new line will be inserted. Default "bottom"
* allowEdit: A boolean param. When true you can edit the content of the line clicked.
* rowOptions: An array with the options of the row. You can see the options allowed [here](https://www.yiiframework.com/doc/api/2.0/yii-helpers-basehtml#renderTagAttributes()-detail).
* $headerRowOptions: An array with the options of the header row. You can see the options allowed [here](https://www.yiiframework.com/doc/api/2.0/yii-helpers-basehtml#renderTagAttributes()-detail).
* deleteRowClass: An string to inform a class that will be used to drop a line.
* modelClass: An string to inform the class that is used in DynamicGridForm

JAVASCRIPT EVENTS
------------

```javascript
/* 
* This event is dispatched before insert a new row in the grid. 
* If this event return false then a new row not will be inserted.
* With this event you can valid if your fields is ok then insert a new row 
*/
$('#dgf-container').on('beforeInsert', (event, values) => {

    console.log('beforeInsert', event, values);
});

/* This event is dispatched after insert a new row in the grid.*/
$('#dgf-container').on('afterInsert', (event, item) => {
    console.log('afterInsert', event, item);
});

/* This event is dispatched when limit is reached.*/
$('#dgf-container').on('limitReached', (event) => {
    console.log('limitReached', event);
});

/* This event is dispatched before update a new row in the grid. */
$('#dgf-container').on('beforeUpdate', (event, values) => {
    console.log('beforeUpdate', values);
});

/* This event is dispatched after update a new row in the grid.*/
$('#dgf-container').on('afterUpdate', (event, item) => {
    console.log('afterUpdate', item);
});
```