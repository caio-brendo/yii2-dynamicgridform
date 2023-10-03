class InputSingleValue extends BaseInput{

    /**
     * @inheritDoc
     */
    async getValue() {
        return this.input.val();
    }

    /**
     * @inheritDoc
     */
    getValueGrid() {
        return this.input.val();
    }

    /**
     * @inheritDoc
     */
    async getInputHidden() {
        if (!this.reference){
            throw new Error('To use this method must be informed the reference.')
        }

        // If value is empty returns input with value empty;
        if (!await this.getValue()) {
            return `<input type="hidden" class="dgf-reorder" name="${this.getNewNameInput()}" value="" data-reference="${this.reference}">`;
        }
        let value = (await this.getValue());
        value = typeof value === 'string' ? value.replaceAll('"', '&quot;') : value;
        return `<input type="hidden" class="dgf-reorder" name="${this.getNewNameInput()}" value="${value}" data-reference="${this.reference}">`
    }

    /**
     * @inheritDoc
     */
    getNewNameInput() {
        return this.baseName.replace('<@>', this.index);
    }

    /**
     * @inheritDoc
     */
    setValue(value) {
        this.input.val(value).trigger('change');
    }
}