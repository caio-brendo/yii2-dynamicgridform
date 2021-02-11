class BaseInput{constructor(input,params){if(this.constructor===BaseInput){throw new Error("Abstract classes can't be instantiated.")}
    this.input=input;this.baseName=params?.baseName;this.index=params?.index;this.reference=params?.reference}
    async getValue(){throw new Error("Method 'value()' must be implemented.")}
    getValueGrid(){throw new Error("Method 'valueGrid()' must be implemented.")}
    async getInputHidden(){throw new Error("Method 'inputHidden()' must be implemented.")}
    getNewNameInput(){throw new Error("Method 'inputHidden()' must be implemented.")}
    setValue(value){throw new Error("Method 'setValue()' must be implemented.")}
    hasBaseName(){return!!this.baseName}
    hasIndex(){return!!this.index}
    hasReference(){return!!this.reference}
    get params(){return{'baseName':this.baseName,'index':this.index,'reference':this.reference}}}