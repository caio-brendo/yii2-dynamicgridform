class InputMultipleValue extends BaseInput{

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
        const ret = [];
        this.input.find('option:selected').each((k, v) => {
            ret.push($(v).text());
        });

        return ret.join(', ');
    }

    /**
     * @inheritDoc
     */
    async getInputHidden() {

        if (!this.hasReference()){
            throw new Error('To use this method must be informed the reference.')
        }

        // If value is empty returns input with value empty;
        if (await this.getValue().length === 0) {
            return `<input type="hidden" name="${this.getNewNameInput()}" value="" data-reference="${this.reference}">`;
        }

        let ret = [];
        for (const value of await this.getValue()){
            ret.push(
                `<input type="hidden" name="${this.getNewNameInput()}" value="${await value}" data-reference="${this.reference}">`
            );
        }

        return ret.join('');
    }

    /**
     * @inheritDoc
     * @return {string}
     */
    getNewNameInput() {
        if (!this.hasBaseName()){
            throw new Error('To use this method must be informed the base name.')
        }
        if (!this.hasIndex()){
            throw new Error('To use this method must be informed the index.')
        }
        return this.baseName.replace('<@>', this.index) + '[]';
    }

    /**
     * @inheritDoc
     */
    setValue(value) {
        this.input.val(this.input.val().concat(value));
    }
}