class InputSingleValue extends BaseInput{async getValue(){return this.input.val()}
    getValueGrid(){return this.input.val()}
    async getInputHidden(){if(!this.reference){throw new Error('To use this method must be informed the reference.')}
        if(!await this.getValue()){return `<input type="hidden" name="${this.getNewNameInput()}" value="" data-reference="${this.reference}">`}
        return `<input type="hidden" name="${this.getNewNameInput()}" value="${await this.getValue()}" data-reference="${this.reference}">`}
    getNewNameInput(){return this.baseName.replace('<@>',this.index)}
    setValue(value){this.input.val(value).trigger('change')}}