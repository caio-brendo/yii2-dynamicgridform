class DivInputRadio extends InputSingleValue {
    /**
     * @inheritDoc
     */
    async getValue() {
        const radio = this.input.find('input:checked');
        const input = InputFactory.getInstance(radio, this.params);
        return input.getValue();
    }
    /**
     * @inheritDoc
     */
    async getValueGrid() {
        const radio = this.input.find('input:checked');
        const input = InputFactory.getInstance(radio, this.params);
        return input.getValueGrid();
    }
    /**
     * @inheritDoc
     */
    setValue(value) {
        this.input.find(`input[value="${value}"]`).prop('checked', true);
    }
}