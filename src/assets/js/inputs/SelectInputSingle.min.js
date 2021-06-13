class SelectInputSingle extends InputSingleValue{

    /**
     * @inheritDoc
     */
    getValueGrid() {
        return this.input.find('option:selected').text();
    }

    /**
     * @inheritDoc
     */
    setValue(value) {
        this.input.val(value).trigger('change');
    }
}