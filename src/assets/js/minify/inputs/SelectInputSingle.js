class SelectInputSingle extends InputSingleValue{getValueGrid(){return this.input.find('option:selected').text()}
    setValue(value){this.input.val(value).trigger('change')}}