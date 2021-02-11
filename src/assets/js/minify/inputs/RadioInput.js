class RadioInput extends InputSingleValue{async getValue(){return this.isChecked?this.input.val():''}
    async getInputHidden(){return this.isChecked?await super.getInputHidden():''}
    getValueGrid(){return this.isChecked?this.input.parent().text():''}
    setValue(){this.input.prop('checked',!0)}
    isChecked(){return this.input.is(':checked')}}