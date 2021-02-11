class FileInput extends InputSingleValue {
    /**
     * @inheritDoc
     */
    constructor(input, params) {
        super(input, params);
        this.file = this.input.get(0).files[0];
    }

    /**
     * @inheritDoc
     */
    async getValue() {
        return await this.file2Base64();
    }

    /**
     * @inheritDoc
     */
    getValueGrid() {
        if (this.hasFile()) {
            return this.input.get(0).files[0].name;
        }

        return '';
    }

    /**
     * Converts file to base64 string
     * @return {Promise<string>}
     */
    async file2Base64() {
        if (this.hasFile()) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(this.input.get(0).files[0]);
                reader.onload = () => resolve(reader.result ? reader.result : '');
                reader.onerror = error => reject(error);
            });
        }

        return '';
    }

    /**
     * @inheritDoc
     */
    setValue(value) {
        console.log('implementar');
    }

    /**
     * Checks if has file
     * @return {boolean}
     */
    hasFile() {
        return !!this.file;
    }

}