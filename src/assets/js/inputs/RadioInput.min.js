class RadioInput extends InputSingleValue {
    /**
     * @inheritDoc
     */
    async getValue() {
        return this.isChecked ? this.input.val() : '';
    }

    /**
     * @inheritDoc
     */
    async getInputHidden() {
        return this.isChecked ? await super.getInputHidden() : '';
    }

    /**
     * @inheritDoc
     */
    getValueGrid() {
        return this.isChecked ? this.input.parent().text() : '';
    }

    /**
     * @inheritDoc
     */
    setValue() {
        this.input.prop('checked', true);
    }

    /**
     * Check if radio is checked
     * @return {boolean}
     */
    isChecked() {
        return this.input.is(':checked');
    }
}